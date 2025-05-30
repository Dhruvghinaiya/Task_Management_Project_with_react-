<?php

namespace App\Repositories;

use App\Mail\welcomemail;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ProjectRepository extends BaseRepository
{
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }

    public function getProjectsByEmployee(string $employeeId): Collection
    {
        return $this->newQuery()
            ->whereHas('users', function ($query) use ($employeeId) {
                $query->where('user_id', $employeeId);
            })
            ->get();
    }

    function getProjectsByClient(string $clientId): Collection
    {
        return $this->newQuery()
            ->where('client_id', $clientId)->limit(3)
            ->get();
    }



    public function  getEmployeesNamesByProject(string $projectId): Collection
    {
        return $this->newQuery()
            ->where('id', $projectId)
            ->with('users')
            ->first()
            ->users
            ->select('id', 'name');
    }
    public function getRecentProjects(int $limit): Collection
    {
        return $this->newQuery()
            ->with(['client', 'tasks',])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
