<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Client\AdminController as ClientAdminController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Contracts\Session\Middleware\AuthenticatesSessions;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::get('/',[AuthenticatedSessionController::class,'welcome'])->name('welcome');

Route::middleware(['role:admin'])->group(function(){
    
    Route::get('dashboard',[AdminController::class,'index'])->name('admin.dashboard');
    Route::get('/profile',[AdminController::class,'profile'])->name('admin.profile');
    Route::post('/profile/update',[AdminController::class,'update'])->name('profile.update');

    //user
      Route::get('/user',[UserController::class,'index'])->name('admin.user.index');
      Route::get('/user/create',[UserController::class,'create'])->name('admin.user.create');
      Route::post('/user/store',[UserController::class,'store'])->name('user.store');
      Route::get('/user/edit/{id}',[UserController::class,'edit'])->name('admin.user.edit');
      Route::patch('/user/update/{id}',[UserController::class,'update'])->name('admin.user.update');
      Route::delete('/user/destroy/{id}',[UserController::class,'destroy'])->name('admin.user.destroy');
      
    //client
    Route::get('/client',[ClientController::class,'index'])->name('admin.client.index');
    Route::get('/client/show',[ClientController::class,'show'])->name('admin.client.show');
    Route::get('/client/create',[ClientController::class,'create'])->name('admin.client.create');
    Route::post('/client/store',[ClientController::class,'store'])->name('admin.client.store');
    Route::get('/client/edit/{id}',[ClientController::class,'edit'])->name('admin.client.edit');
    Route::patch('/client/update/{id}',[ClientController::class,'update'])->name('admin.client.update');
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
    Route::patch('admin/task/update/{id}',[TaskController::class,'update'])->name('admin.task.update');
    Route::delete('admin/task/delete/{task}',[TaskController::class,'destroy'])->name('admin.task.delete');
    
    Route::get('/projects/employees/{project}', [TaskController::class, 'getAssignedEmployees'])->name('project.employees');
    
  });
  
  
  Route::middleware(['auth','role:employee'])->group(function(){
    
    Route::get('/employee/dashboard',[EmployeeController::class,'index'])->name('employee.dashboard');
    Route::get('employee/profile',[AdminController::class,'profile'])->name('employee.profile');
    Route::post('employee/profile/update',[AdminController::class,'update'])->name('employee.profile.update');
    
    Route::get('employee/project',[ProjectController::class,'index'])->name('employee.project.index');
    Route::get('emloyee/project/show/{project}',[ProjectController::class,'show'])->name('employee.project.show');
    
    Route::get('employee/task',[TaskController::class,'index'])->name('employee.task.index');
    Route::get('employee/task/show/{task}',[TaskController::class,'show'])->name('employee.task.show');
    Route::get('task/create',[TaskController::class,'create'])->name('employee.task.create');
    Route::post('task/store',[TaskController::class,'store'])->name('employee.task.store');
    Route::get('employee/task/edit/{task}',[TaskController::class,'edit'])->name('employee.task.edit');
    Route::patch('employee/task/update/{id}',[TaskController::class,'update'])->name('employee.task.update');
    
    Route::get('/employees/project{project}', [TaskController::class, 'getAssignedEmployees'])->name('employees.project');

    
});

Route::middleware(['auth','role:client'])->group(function(){
    
   
    
    Route::get('/client/dashboard',[ClientAdminController::class,'index'])->name('client.dashboard');

    

    Route::get('client/profile',[AdminController::class,'profile'])->name('client.profile');
    Route::post('client/profile/update',[AdminController::class,'update'])->name('client.profile.update');
    

    Route::get('client/project',[ProjectController::class,'index'])->name('client.project.index');
    Route::get('client/project/show/{project}',[ProjectController::class,'show'])->name('client.project.show');

    Route::get('client/task',[TaskController::class,'index'])->name('client.task.index');
    Route::get('client/task/show/{task}',[TaskController::class,'show'])->name('client.task.show');
   

    
});


Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    



require __DIR__.'/auth.php';
