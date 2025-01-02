<?php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

use function Pest\Laravel\get;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }
   
    public function getClient(){
        return $this->newQuery()
        ->where('role' ,'client')->get();
    }
   
    
    public function getUser($role){
        return $this->newQuery()
        ->where('role' ,$role)->get();
    }
   

    public function getAllEmployees()
    {
        return $this->newQuery()
            ->where('role', 'employee')
            ->get();
    }

    public function getRecentUsersByRole(string $role, int $limit)
    {
        return $this->newQuery()
            ->where('role', $role)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
    
}

