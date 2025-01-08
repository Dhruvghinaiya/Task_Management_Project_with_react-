<?php

namespace App\Http\Controllers;

use App\Enums\RoleEnum;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;


use function Pest\Laravel\json;

class UserController extends BaseController
{    protected UserRepository $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index():Response
    {   
        $users = User::all();
        return Inertia::render('Admin/User/Index',compact('users'));
    }

    public function create():Response
    {   $roleenum= RoleEnum::options();
        return inertia::render('Admin/User/Create',compact('roleenum'));
    }

    public function store(RegisterUserRequest $req)
{     
        DB::beginTransaction();
        try{
             $this->userRepository->store($req->getinsertTableField());
            DB::commit();
            return $this->sendRedirectResponse(route('admin.user.index'),'new student add successfully');
        }
        catch(Throwable $e){
            DB::rollBack();
            return inertia::render('Admin/User/Index',$e->getMessage());
        }
    }



    public function edit($id):Response
    {      
        $user = $this->userRepository->getById($id);
        return inertia::render('Admin/User/Edit',compact('user'));
    }

    public function update( UpdateUserRequest $req , $id):RedirectResponse
    {   

        DB::beginTransaction();
        try {
            $this->userRepository->update($id, $req->getinsertTableField());
            DB::commit();
            return $this->sendRedirectResponse(route('admin.user.index'),'user edit successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
    }
    
    public function destroy($id):RedirectResponse
    {   
        DB::beginTransaction();
        try {
            $this->userRepository->destroy($id);
            DB::commit();
            return $this->sendRedirectResponse(route('admin.user.index'),'User deleted Successfully');
        } catch (Throwable $e) {
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
            // return redirect()->back();
        }
    }

}
