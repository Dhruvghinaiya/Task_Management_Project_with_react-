<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;

use App\Http\Requests\UpdateProfileRequest;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use App\Http\Controllers\BaseController;
use App\Repositories\UserRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class AdminController extends BaseController
{   
    protected  UserRepository $userRepository;
    protected  TaskRepository $taskRepository;
    protected ProjectRepository $projectRepository;
    public function __construct(UserRepository $userRepository,TaskRepository $taskrepository,ProjectRepository $projectRepository){
        $this->userRepository= $userRepository;
        $this->taskRepository= $taskrepository;
        $this->projectRepository= $projectRepository;
    }
   
    public function  index():Response
    {
        $taskCount = $this->taskRepository->getAll()->count();
        
        $clientCount = $this->userRepository->getClient()->count();
        
        $employeeCount = $this->userRepository->getAllEmployees()->count();
        
        $projectCount = $this->projectRepository->getAll()->count();
        
        $recentProjects = $this->projectRepository->getRecentProjects(5);
        $recentTasks = $this->taskRepository->getRecentTasks(5);
        
        $recentClients = $this->userRepository->getRecentClient(5);

        $recentEmployees = $this->userRepository->getRecentUsersByRole('employee', 5);
            return inertia::render('Dashboard',compact('taskCount','clientCount','employeeCount','projectCount','recentProjects',
            'recentTasks',
            'recentClients',
            'recentEmployees'));
    }
    public function profile():Response
    {

            // return view('Admin.profile');  
            $users  = Auth::user();
            
            return Inertia::render('Profile',compact('users'));
        
    }

    public function update(UpdateProfileRequest $req):RedirectResponse
    {
        DB::beginTransaction();
        try{
            $this->userRepository->update(Auth::user()->id,$req->getInsertTableField());
            DB::commit();
            return $this->sendRedirectResponse(route('admin.profile'),'user profile update successfully...');
        }
        catch(Throwable $e){
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }
}
