<?php
namespace App\Repositories;

use App\Mail\welcomemail;
use App\Models\Client_Detail;
use App\Models\ClientDetail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ClientRepository extends BaseRepository
{
    public function __construct(ClientDetail $model)
    {
        parent::__construct($model);
    }
    
    public function getUser(){
        
        return  $this->newQuery()->with('user')->get();
    }
    public function getClient($id){
        return $this->newQuery()->where('user_id',$id)->get();
    }
}


