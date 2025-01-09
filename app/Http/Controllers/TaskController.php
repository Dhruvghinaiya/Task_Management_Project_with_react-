<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Enums\TaskStatusEnum;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Jobs\SendDueDateReminderJob;
use App\Models\Project;
use App\Models\Task;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use App\Repositories\ProjectRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Throwable;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

use function Termwind\render;

class TaskController extends BaseController
{
    protected TaskRepository $taskrepository;
    protected UserRepository $userRepository;
    protected ProjectRepository $projectRepository;
    public function __construct(TaskRepository $taskrepository,UserRepository $userRepository,ProjectRepository $projectRepository)
    {
        $this->taskrepository = $taskrepository;
        $this->userRepository = $userRepository;
        $this->projectRepository = $projectRepository;
    }
    
    public function index():Response
    {

        $role = Auth::user()->role;
        
        if($role=='admin' ){
            $tasks = $this->taskrepository->getAll();
        }
        elseif($role=='employee'){
            $tasks = $this->taskrepository->getTasksByEmployee(Auth::id());
            $createdTasks=  $this->taskrepository->getTasksByOtherEmployee(Auth::id());
        }
        else{
            $tasks = $this->taskrepository->getTasksByCLient(Auth::id());
        }
        return inertia::render('Admin/Task/Index',compact('tasks','role'));
    }

    public function show(Task $task):Response{
        $task = Task::with(['createdBy:id,name', 'updatedBy:id,name','assignedUser:id,name','project:id,name'])->find($task->id);
        $role = Auth::user()->role;
        return inertia::render('Admin/Task/Show',compact('task','role'));
        
    }
    public function create()
{
        $employees = $this->userRepository->getAllEmployees();
        $projects = $this->projectRepository->getAll();
        $employees = $this->userRepository->getUser('employee',$projects);
        $role = Auth::user()->role;
        $statuses = StatusEnum::options();
            return inertia::render('Admin/Task/Create',compact('employees','projects','role','statuses',));
       
    }


    public function store(StoreTaskRequest $request):RedirectResponse{
    
        $user = Auth::user()->role;
        DB::beginTransaction();
        try{
               $this->taskrepository->store($request->getInsertableFields());
            DB::commit();
            if($user=='admin'){
            $user = Auth::user()->role;
                return $this->sendRedirectResponse(route('admin.task.index'),'new task add successfully');
            }   
            elseif($user=='employee'){
                return $this->sendRedirectResponse(route('employee.task.index'),'new task add successfully');
            }
        }
        catch(Throwable $e){
            
                DB::rollBack();
                return $this->sendRedirectBackError($e->getMessage());
        }
    }

    public function edit(Task $task):Response{
    
        $role = Auth::user()->role;
        $statuses = StatusEnum::options();
        if($role=='admin'){
            $projects  =$this->projectRepository->getAll();
            $clients = $this->userRepository->getAllEmployees(); 
            }
            elseif($role=='employee'){
                $task =  $this->taskrepository->getById($task->id);
                $projects  =$this->projectRepository->getAll();
                $clients = $this->userRepository->getAllEmployees(); 
            }
            return inertia::render('Admin/Task/Edit',compact('task','clients','projects','role','statuses'));
    }   

    public function update(UpdateTaskRequest $request,$id){
        $user = Auth::user()->role;
        DB::beginTransaction();
            try{
                if($user=='admin'){
                     $this->taskrepository->update($id,$request->getInsertableFields());
                    DB::commit();
                    return $this->sendRedirectResponse(route('admin.task.index'),'task edit sucessfully');
                }
                elseif($user=='employee'){
                    $this->taskrepository->update($id,$request->getInsertableFields());
                    DB::commit();
                    return $this->sendRedirectResponse(route('employee.task.index'),'task edit sucessfully');
                }
            }
            catch(Throwable $e){
                DB::rollBack();{
                    return $this->sendRedirectBackError($e->getMessage());
                }
            }
        
    }
    public function destroy(Task $task):RedirectResponse{

        DB::beginTransaction();
        try {
            $this->taskrepository->destroy($task->id);
            DB::commit();
            return $this->sendRedirectResponse(route('admin.task.index'),'Task Deleted Succesfully');
        } catch (Throwable $e){
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }
    
   

public function getAssignedEmployees(Project $project)
{
    $employees = $project->users()->select('id', 'name')->get();
    
    return $employees->map(function ($employee) {
        return [
            'value' => $employee->id,
            'label' => $employee->name,
        ];
    });
}

}
