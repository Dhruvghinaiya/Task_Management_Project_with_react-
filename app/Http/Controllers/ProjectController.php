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
            $projects = $this->ProjectRepostiry->getProjectsByEmployee(Auth::id());
        }
        return inertia::render('Project/Index', compact('projects', 'role'));
    }

    public function show(Project $project):Response
    {
        $role = Auth::user()->role;

        if ($role == 'admin' || $role == 'employee') {
            $client = $this->userRepostiry->getById($project->client_id);

            $project->load('users', 'client', 'createdBy', 'updatedBy', 'tasks');

        } else if ($role == 'client') {
            $project->load('users', 'client', 'createdBy', 'updatedBy', 'tasks');
            $client = $this->userRepostiry->getById($project->client_id);

        }
        return inertia::render('Project/Show', compact('project', 'client', 'role'));
    }

    public function create()
    {
        $clients = $this->userRepostiry->getUsersByRole('client');
        $employees = $this->userRepostiry->getUsersByRole('employee');
        return inertia::render('Project/Create', compact('clients', 'employees'));
    }

    public function store(StoreProjectRequest $request):RedirectResponse
    {
        DB::beginTransaction();
        try {
            $project =  $this->ProjectRepostiry->store($request->getInsertTableField());
            if ($request->has('employee_ids') && !empty($req->employee_ids)) {
                $project->users()->attach($request->employee_ids);
            }
            DB::commit();
            return $this->sendRedirectResponse(route('admin.project.index'), 'New Project Add Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }
    public function edit(Project $project):Response
    {

        $clients = $this->userRepostiry->getUsersByRole('client');
        $employees = $this->userRepostiry->getUsersByRole('employee');
      $projectEmployees = $this->ProjectRepostiry->getEmployeesNamesByProject($project->id);
        return inertia::render('Project/Edit', compact('project', 'clients', 'employees','projectEmployees'));
    }



    public function update(UpdateProjectRequest $request, Project $project):RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->ProjectRepostiry->update($project->id, $request->getInsertTableField());
            if ($request->has('employee_ids') && !empty($request->employee_ids)) {
                $project->users()->sync($request->employee_ids);
            } else {
                $project->users()->detach();
            }
            DB::commit();
        return $this->sendRedirectResponse(route('admin.project.show',$project), 'Project Updated Successfully');
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
