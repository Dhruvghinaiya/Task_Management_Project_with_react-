<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BaseController;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

use function Termwind\render;

class EmployeeController extends BaseController
{
    protected UserRepository $userRepository;
    protected TaskRepository  $taskRepository;
    protected ProjectRepository  $projectRepository;
    
    public function __construct(UserRepository $userRepository, TaskRepository $taskRepository,ProjectRepository $projectRepository)
    {
        $this->userRepository=$userRepository;
        $this->taskRepository = $taskRepository;
        $this->projectRepository = $projectRepository;
    }


    public function index():Response
       {
        $projectCount = $this->projectRepository->getProjectsByEmployee(Auth::user()->id)->count();
        $clientCount  = $this->userRepository->getUsersByRole('client')->count();
        $taskCount  = $this->taskRepository->getTasksByEmployee(Auth::id(),'assigned')->count();
        $tasks = $this->taskRepository->getTasksByEmployee(Auth::user()->id,'assigned');
        $projects = $this->projectRepository->getProjectsByEmployee(Auth::user()->id);
        return Inertia::render('Employee/Dashboard',compact('projectCount','clientCount','taskCount','tasks','projects'));
        
    }

    public function update(UpdateProfileRequest $request):RedirectResponse
    {
        DB::transaction();
        try{
            $this->userRepository->update(Auth::user()->id,$request->getInsertTableField());
            DB::commit();
            return $this->sendRedirectResponse(route('employee.profile'),'user profile update successfully...');
        }
        catch(Throwable $e){
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }
}
