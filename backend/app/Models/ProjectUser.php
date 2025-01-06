<?php

namespace App\Models;

use App\Enums\ProjectUserRole;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjectUser extends Pivot
{
    protected $fillable = [
        "project_id",
        "user_id",
        "role",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    protected function casts(): array
    {
        return [
            'role' => ProjectUserRole::class,
        ];
    }
}
