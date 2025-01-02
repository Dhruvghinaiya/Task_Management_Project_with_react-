<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Contracts\Session\Middleware\AuthenticatesSessions;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['role:admin'])->group(function(){
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard',[ 'taskCount' => 10, // Dummy task count
        'projectCount' => 5, // Dummy project count
        'clientCount' => 15, // Dummy client count
        'recentProjects' => [
            ['id' => 1, 'name' => 'Project 1', 'client' => ['name' => 'Client 1'], 'end_date' => '2025-01-10', 'tasks' => [['id' => 1]]],
            ['id' => 2, 'name' => 'Project 2', 'client' => ['name' => 'Client 2'], 'end_date' => '2025-02-15', 'tasks' => [['id' => 1], ['id' => 2]]],
        ], // Dummy recent projects
        'recentTasks' => [
            ['id' => 1, 'name' => 'Task 1', 'status' => 'completed', 'project' => ['name' => 'Project 1'], 'assignedUser' => ['name' => 'User 1']],
            ['id' => 2, 'name' => 'Task 2', 'status' => 'in-progress', 'project' => ['name' => 'Project 2'], 'assignedUser' => ['name' => 'User 2']],
        ], // Dummy recent tasks
        'recentClients' => [
            ['id' => 1, 'name' => 'Client 1', 'email' => 'client1@example.com', 'company_name' => 'Company 1', 'contact_number' => '1234567890'],
            ['id' => 2, 'name' => 'Client 2', 'email' => 'client2@example.com', 'company_name' => 'Company 2', 'contact_number' => '9876543210'],
        ], // Dummy recent clients
        'recentEmployees' => [
            ['id' => 1, 'name' => 'Employee 1', 'email' => 'employee1@example.com', 'role' => 'Manager'],
            ['id' => 2, 'name' => 'Employee 2', 'email' => 'employee2@example.com', 'role' => 'Developer'],
        ], // Dummy recent employees
    ]);
    })->name('dashboard');
    

      //user
      Route::get('/user',[UserController::class,'index'])->name('user.index');
      Route::get('/user',[UserController::class,'index'])->name('admin.user.index');
      Route::get('/user/create',[UserController::class,'create'])->name('admin.user.create');
      Route::post('/user/store',[UserController::class,'store'])->name('user.store');
      Route::get('/user/edit/{id}',[UserController::class,'edit'])->name('admin.user.edit');
      Route::post('/user/update/{id}',[UserController::class,'update'])->name('demo');
      Route::delete('/user/destroy/{id}',[UserController::class,'destroy'])->name('admin.user.destroy');
  
    //client
      Route::get('/client',[ClientController::class,'index'])->name('admin.client.index');
      Route::get('/client/show',[ClientController::class,'show'])->name('admin.client.show');
      Route::get('/client/create',[ClientController::class,'create'])->name('admin.client.create');
      Route::post('/client/store',[ClientController::class,'store'])->name('admin.client.store');
      Route::get('/client/edit/{id}',[ClientController::class,'edit'])->name('admin.client.edit');
      Route::post('/client/update/{id}',[ClientController::class,'update'])->name('admin.client.update');
      Route::delete('/client/delete/{id}',[ClientController::class,'destroy'])->name('admin.client.delete');

    //project
    Route::get('/project',[ProjectController::class,'index'])->name('admin.project.index');
    Route::get('project/create',[ProjectController::class,'create'])->name('admin.project.create');
    Route::post('project/store',[ProjectController::class,'store'])->name('admin.project.store');
    Route::get('project/edit/{project}',[ProjectController::class,'edit'])->name('admin.project.edit');
    Route::patch('project/update/{project}',[ProjectController::class,'update'])->name('admin.project.update');
    Route::delete('project/delete/{id}',[ProjectController::class,'destroy'])->name('admin.project.delete');
    Route::get('project/show/{project}',[ProjectController::class,'show'])->name('admin.project.show');
    
    //tasks    
    Route::get('/task',[TaskController::class,'index'])->name('admin.task.index');
    Route::get('admin/task/show/{task}',[TaskController::class,'show'])->name('admin.task.show');
    Route::get('admin/task/create',[TaskController::class,'create'])->name('admin.task.create');
    Route::post('admin/task/store',[TaskController::class,'store'])->name('admin.task.store');
    Route::get('admin/task/edit/{task}',[TaskController::class,'edit'])->name('admin.task.edit');
    Route::post('admin/task/update/{id}',[TaskController::class,'update'])->name('admin.task.update');
    Route::delete('admin/task/delete/{task}',[TaskController::class,'destroy'])->name('admin.task.delete');
    

});


Route::middleware(['auth','role:employee'])->group(function(){

    Route::get('/employee/dashboard', function () {
        return Inertia::render('Employee/Dashboard');
    })->name('employee.dashboard');
    
});

Route::middleware(['auth','role:client'])->group(function(){

    Route::get('/client/dashboard', function () {
        return Inertia::render('Client/Dashboard');
    })->name('client.dashboard');
    
});


Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
