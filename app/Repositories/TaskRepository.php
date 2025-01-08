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
    function getTasksByEmployee($id)
    {
        return $this->newQuery()
            ->where('assigned_to', $id)
            ->get();
    }


    function getTasksByOtherEmployee($id)
    {
        return $this->newQuery()
            ->where('created_by', $id)
            ->get();
    }
    // public function getAllClients()
    // {
    //     return $this->newQuery()
    //         ->where('role', 'client')
    //         ->get();
    // }

    // function getTaskByClient($id){
    //     return $this->newQuery()->whereHas('project',function($query) use($id) {
    //         $query->where('client_id',$id)->with('project')->get();
    //     });
    // }

    public function getTasksByClient(string $clientId)
    {
        return $this->newQuery()
            ->whereHas('project', function ($query) use ($clientId) {
                $query->where('client_id', $clientId);
            })
            ->with('project', 'assignedUser', 'client')->get();
    }


    // public function getProjectByEmployee($employeeId)
    // {
    //     $tasks = $this->newQuery()
    //         ->where('assigned_to', $employeeId)
    //         ->with('project')
    //         ->get();
    //     return $tasks->pluck('project')->unique();
    // }

    public function getRecentTasks(int $limit)
    {
        return $this->newQuery()
            ->with(['project', 'assignedUser'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
