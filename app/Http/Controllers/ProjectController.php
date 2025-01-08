<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Client_Detail;
use App\Models\Project;
use App\Repositories\ClientRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\UserRepository;
use App\Http\Controllers\BaseController;
use App\Repositories\TaskRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PhpParser\ErrorHandler\Throwing;
use Ramsey\Uuid\Guid\Guid;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

use function Laravel\Prompts\progress;

class ProjectController extends BaseController
{
    protected ClientRepository $clientRepository;
    protected ProjectRepository $ProjectRepostiry;
    protected UserRepository $userRepostiry;
    protected TaskRepository $taskReposirtory;
    public function __construct(ClientRepository $clientRepository, ProjectRepository $projectRepository, UserRepository $userRepostiry, TaskRepository $taskReposirtory)
    {
        $this->clientRepository = $clientRepository;
        $this->ProjectRepostiry = $projectRepository;
        $this->userRepostiry = $userRepostiry;
        $this->taskReposirtory = $taskReposirtory;
    }
    public function index():Response
    {

        $role = Auth::user()->role;
        if ($role == RoleEnum::Admin->value) {
            $projects = $this->ProjectRepostiry->getAll();
        } elseif ($role == 'client') {
            $projects = $this->ProjectRepostiry->getProjectsByClient(Auth::id());
        } else {
            $projects = $this->taskReposirtory->getProjectByEmployee(Auth::id());
            
        }
        return inertia::render('Admin/Project/Index', compact('projects', 'role'));
    }

    public function show(Project $project):Response
    {
        $role = Auth::user()->role;

        if ($role == 'admin' || $role == 'employee') {
            $client = $this->userRepostiry->getById($project->client_id);
            $project->load('users', 'client', 'creator', 'updater', 'tasks');

        } else if ($role == 'client') {
            $project->load('users', 'client', 'creator', 'updater', 'tasks');
            $client = $this->userRepostiry->getById($project->client_id);

        }
        return inertia::render('Admin/Project/Show', compact('project', 'client', 'role'));
    }

    public function create():Response
    {
        $clients = $this->userRepostiry->getClient();
        $employees = $this->userRepostiry->getAllEmployees();
        return inertia::render('Admin/Project/Create', compact('clients', 'employees'));
    }

    public function store(StoreProjectRequest $req):RedirectResponse
    {
        DB::beginTransaction();
        try {
            $project =  $this->ProjectRepostiry->store($req->getInsertTableField());
            if ($req->has('employee_ids') && !empty($req->employee_ids)) {
                $project->users()->attach($req->employee_ids);
            }
            DB::commit();
            return redirect()->route('admin.project.index');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }
    public function edit(Project $project):Response
    {

        $clients = $this->userRepostiry->getUser('client');
        $employees = $this->userRepostiry->getUser('employee');
        return inertia::render('Admin/Project/Edit', compact('project', 'clients', 'employees'));
    }



    public function update(UpdateProjectRequest $req, Project $project):RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->ProjectRepostiry->update($project->id, $req->getInsertTableField());
            if ($req->has('employee_ids') && !empty($req->employee_ids)) {
                $project->users()->sync($req->employee_ids);
            } else {
                $project->users()->detach();
            }
            DB::commit();
            return $this->sendRedirectResponse(route('admin.project.index'), 'Project Updated Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }


    public function destroy($id):RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->ProjectRepostiry->destroy($id);
            DB::commit();
            return $this->sendRedirectResponse(route('admin.project.index'), 'project delete successfully');
        } catch (Throwable $e) {
            DB::rollBack();

            return $this->sendRedirectBackError($e->getMessage());
        }
    }
}
