<?php
namespace App\Repositories;

use App\Models\Company;
use App\Models\Client_Detail;
use App\Models\ClientDetail;
use Illuminate\Database\Eloquent\Collection;

class ClientRepository extends BaseRepository
{
    public function __construct(ClientDetail $model)
    {
        parent::__construct($model);
    }
   
   
    public function getClient(){
        return ClientDetail::where('role','client')->get();
    }
}

