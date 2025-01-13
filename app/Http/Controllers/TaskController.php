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
    public function __construct(TaskRepository $taskrepository, UserRepository $userRepository, ProjectRepository $projectRepository)
    {
        $this->taskrepository = $taskrepository;
        $this->userRepository = $userRepository;
        $this->projectRepository = $projectRepository;
    }

    public function index()
    {

        $role = Auth::user()->role;

        if ($role == 'admin') {
            // $tasks = $this->taskrepository->getPaginate(6);
            $tasks = $this->taskrepository->getAll();
        } elseif ($role == 'employee') {
            $tasks = $this->taskrepository->getTasksByEmployee(Auth::id());
            $createdTasks =  $this->taskrepository->getTasksCreatedByEmployee(Auth::id());
        } else {
            $tasks = $this->taskrepository->getTasksByCLient(Auth::id());
        }
        return inertia::render('Task/Index', compact('tasks', 'role'));
    }

    public function show(Task $task)
    {       
        $task = $this->taskrepository->getById($task->id,['createdBy:id,name', 'updatedBy:id,name', 'assignedUser:id,name', 'project:id,name']);
        $role = Auth::user()->role;
        return inertia::render('Task/Show', compact('task', 'role'));
    }
    public function create()
    {
        $employees = $this->userRepository->getUsersByRole('role');
        $projects = $this->projectRepository->getAll(['users']);
        $role = Auth::user()->role;
        $statuses = StatusEnum::options();
        return inertia::render('Task/Create', compact('employees', 'projects', 'role', 'statuses',));
    }


    public function store(StoreTaskRequest $request): RedirectResponse
    {

        $userRole = Auth::user()->role;
        DB::beginTransaction();
        try {
            $this->taskrepository->store($request->getInsertableFields());
            DB::commit();
            return $this->sendRedirectResponse(route($userRole.'task.index'),'New Task Added Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }

    public function edit(Task $task)
    {

        $role = Auth::user()->role;
        $statuses = StatusEnum::options();    

        $projects  = $this->projectRepository->getAll(['users']);
        
        return inertia::render('Task/Edit', compact('task', 'projects', 'role', 'statuses'));
    }

    public function update(UpdateTaskRequest $request, $id)
    {
        $role = Auth::user()->role;
        DB::beginTransaction();
        try {
                $this->taskrepository->update($id, $request->getInsertableFields());
                DB::commit();
                return $this->sendRedirectResponse(route($role.'.task.index'), 'task edit sucessfully');

        } catch (Throwable $e) {
            DB::rollBack(); {
                return $this->sendRedirectBackError($e->getMessage());
            }
        }
    }
    public function destroy(Task $task): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->taskrepository->destroy($task->id);
            DB::commit();
            return $this->sendRedirectResponse(route('admin.task.index'), 'Task Deleted Succesfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }

   
}
