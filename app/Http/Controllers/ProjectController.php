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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PhpParser\ErrorHandler\Throwing;
use Ramsey\Uuid\Guid\Guid;
use Inertia\Inertia;
use Throwable;

use function Laravel\Prompts\progress;

class ProjectController extends BaseController
{
    protected ClientRepository $clientRepository;
    protected ProjectRepository $ProjectRepostiry;
    protected UserRepository $userRepostiry;
    protected TaskRepository $taskReposirtory;
    public function __construct(ClientRepository $clientRepository,ProjectRepository $projectRepository ,UserRepository $userRepostiry,TaskRepository $taskReposirtory)
    {   
        $this->clientRepository = $clientRepository;
        $this->ProjectRepostiry = $projectRepository;
        $this->userRepostiry = $userRepostiry;
        $this->taskReposirtory = $taskReposirtory;
    }
    public function index(){

        $role = Auth::user()->role;
        if($role==RoleEnum::Admin->value ){
            $projects = $this->ProjectRepostiry->getAll();
            
            // return view('Admin.Projects.index',compact('projects'));
            return inertia::render('Admin/Project/index',compact('projects','role'));
        }
        elseif($role=='client'){
            
            $projects = $this->ProjectRepostiry->getProjectsByClient(Auth::id());
            // return view('Client.project.index',compact('projects'));
            return inertia::render('Admin/Project/index',compact('projects','role'));
        }
        else{
        $projects = $this->taskReposirtory->getProjectByEmployee(Auth::id());
        return inertia::render('Admin/Project/index',compact('projects','role'));
        }

    }
    
    public function show(Project $project){
        $role = Auth::user()->role;
        
        if($role=='admin' || $role=='employee'){
             $client= $this->userRepostiry->getById($project->client_id);
             $project->load('users', 'client', 'creator', 'updater', 'tasks');
             //  return $project;
             // return $project;
             // return view('Admin.Projects.project_details',compact('project','client'));
             return inertia::render('Admin/Project/show',compact('project','client','role'));
            }
            else if($role=='client'){
                // $project = $this->ProjectRepostiry->getById($project->id);
                $project->load('users', 'client', 'creator', 'updater', 'tasks');
            $client= $this->userRepostiry->getById($project->client_id);
            // dd($client);
            return inertia::render('Admin/Project/show',compact('project','client','role'));
            // return view('Client.project.show',compact('project','client'));
        }
    }

    public function create(){
        $clients = $this->userRepostiry->getClient();      
        $employees = $this->userRepostiry->getAllEmployees();
        // return view('Admin.Projects.create_project',compact('clients','employees'));
        return inertia::render('Admin/Project/create',compact('clients','employees'));

    }
    public function store(StoreProjectRequest $req){
        DB::beginTransaction();
        try {
          return  $project=  $this->ProjectRepostiry->store($req->getInsertTableField());
            if ($req->has('employee_ids') && !empty($req->employee_ids)) {
                $project->users()->attach($req->employee_ids); 
            }
            DB::commit();
            // return $this->sendRedirectResponse(route('admin.project.index'),'New project created successfully');
            return redirect()->route('admin.project.index');
            
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }
    public function edit(Project $project){

        $clients = $this->userRepostiry->getUser('client');     
        $employees = $this->userRepostiry->getUser('employee');
        // return view('Admin.Projects.edit',compact('project','clients','employees'));
        return inertia::render('Admin/Project/Edit',compact('project','clients','employees'));
    }

   

    public function update(UpdateProjectRequest $req, Project $project)
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


    public function destroy($id){   
        DB::beginTransaction();
        try{
            $this->ProjectRepostiry->destroy($id);
            DB::commit();
            return $this->sendRedirectResponse(route('admin.project.index'),'project delete successfully');
            // return redirect()->route('admin.project.index')->with('status', 'Project deleted successfully!');

        }
        catch(Throwable $e){
            DB::rollBack();

            return $this->sendRedirectBackError($e->getMessage());
        }

    }
}
