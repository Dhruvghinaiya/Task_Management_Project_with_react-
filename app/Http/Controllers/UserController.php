<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Throwable;


use function Pest\Laravel\json;

class UserController extends BaseController
{    protected UserRepository $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index()
    {   
        $users = User::all();
// session()->flash('success', 'User created successfully.');
        return Inertia::render('Admin/User/index',compact('users'));
    }

    public function create()
    {
        return inertia::render('Admin/User/create');
    }

    public function store(RegisterUserRequest $req)
{     
        DB::beginTransaction();
        try{
             $this->userRepository->store($req->getinsertTableField());
            DB::commit();
            // return $this->sendRedirectResponse(route('admin.user.index'),'new user created successfully.');
            // session()->flash('success', 'User created successfully.');
            // return redirect()->route('admin.user.index')->with('success','new user created Successfully.');
            return $this->sendRedirectResponse(route('admin.user.index'),'new student add successfully');
        }
        catch(Throwable $e){
            DB::rollBack();
            return inertia::render('Admin/user/create',$e->getMessage());
        }
    }



    public function edit($id)
    {      
        $user = $this->userRepository->getById($id);
        return inertia::render('Admin/User/edit',compact('user'));
    }

    public function update( UpdateUserRequest $req , $id)
    {   

        // DB::beginTransaction();
        try {
            $this->userRepository->update($id, $req->getinsertTableField());
            DB::commit();
            // return $this->sendRedirectResponse(route('admin.user.index'),'User Updated Successfully');
            // return redirect()->route('admin.user.index')->with('success','user edit successfull');
            return $this->sendRedirectResponse(route('admin.user.index'),'user edit successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            // return $this->sendRedirectBackError($e->getMessage());
        }
    }
    
    public function destroy($id)
    {   
        DB::beginTransaction();
        try {
            $this->userRepository->destroy($id);
            DB::commit();
            // return $this->sendRedirectResponse(route('admin.user.index'),'User deleted Successfully');
            return redirect()->route('admin.user.index','User deleted Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            // return $this->sendRedirectBackError($e->getMessage());
            return redirect()->back();
        }
    }

}
