<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class discussion extends Model
{
    use HasFactory;
    protected $fillable =[
        'sender_id',
        'receiver_id',
        'type',
        'contenu'
    ];
}
