<?php
namespace App\Repositories;

use App\Mail\welcomemail;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ProjectRepository extends BaseRepository
{
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }
  

    


    public function getProjectsByEmployee($employeeId)
    {
        return $this->newQuery()
            ->whereHas('tasks', function ($query) use ($employeeId) {
                $query->where('assigned_to', $employeeId);
            })
            ->get();
    }

    function getProjectsByClient($id)
    {
        return $this->newQuery()
            ->where('client_id', $id)
            ->get();
    }
    public function getTasksByClient($clientId)
    {
        return $this->newQuery()
            ->where('client_id', $clientId)
            ->with('tasks')
            ->get();
            
}

public function getRecentProjects(int $limit)
    {
        return $this->newQuery()
            ->with(['client', 'tasks'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

}
