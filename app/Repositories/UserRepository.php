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


    public function getUsersByRole(string $role):Collection
    {
        return $this->newQuery()
            ->where('role', $role)->with('clientDetail')->get();
    }


    public function getRecentUsersByRole(string $role, int $limit):Collection
    {
        return $this->newQuery()
            ->where('role', $role)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }



}
