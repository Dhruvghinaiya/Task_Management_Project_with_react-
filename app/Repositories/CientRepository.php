<?php
namespace App\Repositories;

use App\Models\Company;
use App\Models\Client_Detail;
use Illuminate\Database\Eloquent\Collection;

class ClientRepository extends BaseRepository
{
    public function __construct(Client_Detail $model)
    {
        parent::__construct($model);
    }
   
   
    public function getClient(){
        return Client_Detail::where('role','client')->get();
    }
}

