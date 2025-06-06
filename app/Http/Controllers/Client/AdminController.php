<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    protected UserRepository $userRepository;
    protected TaskRepository $taskRepository;
    protected ProjectRepository $projectRepository;

    public function __construct(UserRepository $userRepository, TaskRepository $taskRepository, ProjectRepository $projectRepository)
    {
        $this->userRepository = $userRepository;
        $this->taskRepository = $taskRepository;
        $this->projectRepository = $projectRepository;
    }

    public function index()
    {

        $taskCount = $this->taskRepository->getTasksByClient(Auth::id())->count();
        $projectCount = $this->projectRepository->getProjectsByClient(Auth::id())->count();
        $projects = $this->projectRepository->getProjectsByClient(Auth::user()->id)->load('tasks');

        return Inertia::render('Client/Dashboard', compact('taskCount', 'projectCount', 'projects'));
    }
    public function projects(User $user)
    {
        $projects = $this->projectRepository->getProjectsByClient($user->id);
        return view('client.projects', compact('projects'));
    }
}
