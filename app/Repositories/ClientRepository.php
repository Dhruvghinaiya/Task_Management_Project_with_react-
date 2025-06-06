<?php
namespace App\Repositories;

use App\Mail\welcomemail;
use App\Models\Client_Detail;
use App\Models\ClientDetail;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ClientRepository extends BaseRepository
{
    public function __construct(ClientDetail $model)
    {
        parent::__construct($model);
    }
    
    public function getClient(string $clientId):Collection
    {
        return $this->newQuery()->where('user_id',$clientId)->get();
    }


}


