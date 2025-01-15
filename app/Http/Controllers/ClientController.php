<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Repositories\ClientRepository;
use App\Repositories\UserRepository;
use App\Http\Controllers\BaseController;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;


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
        $users = $this->userRepository->getUsersByRole('client');
        return Inertia::render('ClientDetail/Index',compact('users'));
        
    }
    
   
    public function create():Response
    {

         $client = $this->userRepository->getUsersByRole('client');
        return inertia::render('ClientDetail/Create',compact('client'));
    }
    
    public function store(StoreClientRequest $req)
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

     public function edit($id)
    {     
         $user = $this->userRepository->getById($id);
         $clients = $this->clientRepository->getClient($id);
        return inertia::render('ClientDetail/Edit',compact('user','clients'));
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
            return $this->sendRedirectResponse(route('admin.client.index'),'Client  Delete  Successfully');
        }
        catch(Throwable $e){
            DB::rollBack();
            return redirect()->back();
        }
    }

}
