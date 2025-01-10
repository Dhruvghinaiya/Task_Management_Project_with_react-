<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Throwable;

class TaskRepository extends BaseRepository
{
    public function __construct(Task $model)
    {
        parent::__construct($model);
    }
    function getTasksByEmployee(string $employeeId):Collection
    {
        return $this->newQuery()
            ->where('assigned_to', $employeeId)
            ->get();
    }


    function getTasksCreatedByEmployee( string  $employeeId):Collection
    {
        return $this->newQuery()
            ->where('created_by', $employeeId)
            ->get();
    }
    
    public function getTasksByClient(string $clientId):Collection
    {
        return $this->newQuery()
            ->whereHas('project', function ($query) use ($clientId) {
                $query->where('client_id', $clientId);
            })
            ->with('project', 'assignedUser', 'client')->get();
    }


    public function getRecentTasks(int $limit):Collection
    {
        return $this->newQuery()
            ->with(['project', 'assignedUser'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
