<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SharedProject extends Model
{
    protected $fillable = ['project_id', 'user_id', 'permission'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
