<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\http\Controllers\BaseController;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use Illuminate\Database\Console\Migrations\BaseCommand;
use Illuminate\Http\Request;
use App\Enums\StatusEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Throwable;

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
    
    public function index(){

        $role = Auth::user()->role;
        // dd($tasks);
        if($role=='admin' ){
            $tasks = $this->taskrepository->getAll();
            // return view('Admin.Tasks.index',compact('tasks'));
            return Inertia::render('Admin/Task/Index',compact('tasks','role'));
        }
        elseif($role=='employee'){
            $tasks = $this->taskrepository->getTasksByEmployee(Auth::id());
            $createdTasks=  $this->taskrepository->getTasksByOtherEmployee(Auth::id());
            return Inertia::render('Admin/Task/Index',compact('tasks','role','createdTasks'));
        }
        else{
            $projects = $this->projectRepository->getTasksByClient(Auth::id());
            $tasks = $projects->pluck('tasks')->flatten();
            // return $projects->tasks;
            // return $tasks;
            // return view('Client.task.index',compact('tasks'));
            return inertia::render('Admin/Task/Index',compact('tasks','role'));
        }
    }

    public function show(Task $task){
        $task = Task::with(['createdBy:id,name', 'updatedBy:id,name','assignedUser:id,name','project:id,name'])->find($task->id);
        $role = Auth::user()->role;
        if($role=='admin'){
            return inertia::render('Admin/Task/Show',compact('task','role'));
        }
        elseif($role=='employee'){
            // $task = $this->taskrepository->getById($task->id);
            return inertia::render('Admin/Task/Show',compact('task','role'));
        }
        else{
            // return view('Client.task.sshhow',compact('task','role'));
            return inertia::render('Admin/Task/Show',compact('task','role'));
        }
        
    }
    public function create(){

        $employees = $this->userRepository->getAllEmployees();
        $projects = $this->projectRepository->getAll();
        $role = Auth::user()->role;
        if($role=='admin' || $role=='employee' ){
            // return view('Admin.Tasks.create_task',compact('employees','projects'));
            return inertia::render('Admin/Task/Create',compact('employees','projects','role'));
        }   
        // elseif($user=='employee'){
        //     return view('employee.task.create_task',compact('employees','projects',['statusEnums' => StatusEnum::cases()]));
        // }
    }

    // public function store(StoreTaskRequest $req){
    //     DB::beginTransaction();
    //     $user = Auth::user()->role;
    //     // try{
    //           $this->taskrepository->store($req->getInsertableFields());
    //         // DB::commit();
    //         if($user=='admin'){
    //             // Task::create($req->getInsertableFields());
    //             // return $this->sendRedirectResponse(route('admin.task.index'),'new task add successfully');
    //             return redirect()->route('admin.task.index');
    //         }   
    //         elseif($user=='employee'){
    //             return $this->sendRedirectResponse(route('employee.task.index'),'new task add successfully');
       
    //         }
        // }
        // catch(Throwable $e){
        //     if($user=='admin'){
        //         DB::rollBack();
        //         return $this->sendRedirectBackError($e->getMessage());
        //     }   
        //     elseif($user=='employee'){
        //         DB::rollBack();
        //         return $this->sendRedirectBackError($e->getMessage());
        //     }

        // }
    // }

    public function store(StoreTaskRequest $req){
    
        $user = Auth::user()->role;
        DB::beginTransaction();
        try{
               $this->taskrepository->store($req->getInsertableFields());
            DB::commit();
            if($user=='admin'){
            $user = Auth::user()->role;
                // return $this->sendRedirectResponse(route('admin.task.index'),'new task add successfully');
                return redirect()->route('admin.task.index');
            }   
            elseif($user=='employee'){
                return $this->sendRedirectResponse(route('employee.task.index'),'new task add successfully');
       
            }
        }
        catch(Throwable $e){
            if($user=='admin'){
                DB::rollBack();
                return $this->sendRedirectBackError($e->getMessage());
            }   
            elseif($user=='employee'){
                DB::rollBack();
                return $this->sendRedirectBackError($e->getMessage());
            }

        }
    }

    public function edit(Task $task){
    
        $role = Auth::user()->role;
        if($role=='admin'){
            $projects  =$this->projectRepository->getAll();
            $clients = $this->userRepository->getAllEmployees(); 
                // return view('Admin.Tasks.edit',compact('task','clients','projects'));
                return inertia::render('Admin/Task/Edit',compact('task','clients','projects','role'));
            }
            elseif($role=='employee'){
                $task =  $this->taskrepository->getById($task->id);
                $projects  =$this->projectRepository->getAll();
                $clients = $this->userRepository->getAllEmployees(); 
                return inertia::render('Admin/Task/Edit',compact('task','clients','projects','role'));
            //  return view('Employee.task.edit',compact('task','clients','projects'));
     
        }
    }   

    public function update(UpdateTaskRequest $req,$id){
        $user = Auth::user()->role;
        DB::beginTransaction();
            try{
                if($user=='admin'){
                    $this->taskrepository->update($id,$req->getInsertableFields());
                    DB::commit();
                    return $this->sendRedirectResponse(route('admin.task.index'),'task edit sucessfully');
                    
                }
                elseif($user=='employee'){
                    $this->taskrepository->update($id,$req->getInsertableFields());
                    DB::commit();
                    return $this->sendRedirectResponse(route('employee.task.index'),'task edit sucessfully');
                }
            }
            catch(Throwable $e){
                DB::rollBack();
                if($user=='admin'){
                    return $this->sendRedirectBackError($e->getMessage());
                }
                elseif($user=='employee'){
                    return $this->sendRedirectBackError($e->getMessage());
                }
            }
        
    }
    public function destroy(Task $task){

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
}
