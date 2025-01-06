<?php

namespace App\Models;

use App\Enums\ProjectUserRole;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
    ];


    public function users()
    {
        return $this->belongsToMany(User::class)
            ->using(ProjectUser::class)
            ->withPivot('role')
            ->withTimestamps();
    }

    public function owner()
    {
        return $this->users()
            ->wherePivot('role', ProjectUserRole::OWNER)
            ->first();
    }

    public function contributors()
    {
        return $this->users()
            ->wherePivotIn('role', [ProjectUserRole::EDITOR, ProjectUserRole::VIEWER]);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
