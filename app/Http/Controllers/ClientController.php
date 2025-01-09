<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\ClientDetail;
use App\Models\User;
use App\Repositories\ClientRepository;
use App\Repositories\UserRepository;
use Exception;
use App\Http\Controllers\BaseController;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

use function Termwind\render;

class ClientController extends BaseController
{    
    protected UserRepository $userRepository;
    protected ClientRepository $clientRepository;
    public function __construct(UserRepository $userRepository,ClientRepository $clientRepository)
    {
        $this->userRepository  = $userRepository;
        $this->clientRepository  = $clientRepository;


    }
    
    public function index():Response
    {
        
        $role = Auth::user()->role;
        $users = $this->userRepository->getClient();
        return Inertia::render('Admin/Client/Index',compact('users'));
        
    }
    
    public function show() :Response
    {
        return Inertia::render('Admin/Client/Show',compact('clients'));
    }

    public function create():Response
    {

        $client = $this->userRepository->getClient();
        return inertia::render('Admin/Client/Create',compact('client'));
    }
    
    public function store(StoreClientRequest $req):RedirectResponse
    {
        DB::beginTransaction();
        try{
             $this->userRepository->store($req->getInsertTableFiel1());
              $this->clientRepository->store($req->getInsertTableField2());
            DB::commit();
            return $this->sendRedirectResponse(route('admin.client.index'),'Client add successfully');
        }
        catch(Throwable $e){
            DB::rollBack();
            return redirect()->back();
        }
    }
    
    public function profile(){
            return view('Client.profile');   
    }

     public function edit($id):Response
    {     
         $user = $this->userRepository->getById($id);
         $clients = $this->clientRepository->getClient($id);
        return inertia::render('Admin/Client/Edit',compact('user','clients'));
    }

    public function update(UpdateClientRequest $req, $id):RedirectResponse
    {       
        
        DB::beginTransaction();
        try{

            $this->userRepository->update($req->user_id,$req->getInsertTableFiel1());
            $this->clientRepository->update($req->client_id,$req->getInsertTableField2());
            DB::commit();
            return $this->sendRedirectResponse(route('admin.client.index'),'Client Update Successsfully...');
        }
        catch(Throwable $e){
            DB::rollBack();
            return $this->sendRedirectBackError($e->getMessage());
        }
        
    }

    public function destroy($id):RedirectResponse
    {      
        DB::beginTransaction();
        try{
            $this->userRepository->destroy($id);
            $this->clientRepository->getClient($id);
            DB::commit();
            return redirect()->route('admin.client.index')->with('message','user delete successfully');
        }
        catch(Throwable $e){            
            DB::rollBack();
            return redirect()->back();
        }
    }

}
