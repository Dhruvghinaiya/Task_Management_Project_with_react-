<?php

namespace App\Enums;

use App\Traits\OptionsTrait;

enum StatusEnum:string
{
    use OptionsTrait;
    case Pending = 'pending';
    case InProgress  = 'in Progress';
    case Completed = 'completed';
}
