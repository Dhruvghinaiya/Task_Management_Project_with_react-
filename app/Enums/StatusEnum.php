<?php

namespace App\Enums;

enum StatusEnum:string
{
    case Pending = 'pending';
    case InProgress  = 'in Progress';
    case Completed = 'completed';
}
