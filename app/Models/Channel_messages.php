<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Channel_messages extends Model
{
    use HasFactory;
    protected $fillable=["user_id","channel_id","contenu"];
}