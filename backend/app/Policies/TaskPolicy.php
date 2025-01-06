<?php

namespace App\Policies;

use App\Enums\ProjectUserRole;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    public function viewAny(User $user, Project $project): bool
    {
        return $user->can('view', $project);
    }

    public function view(User $user, Task $task): bool
    {
        return $user->can('view', $task->project);
    }

    public function create(User $user, Project $project): bool
    {
        return $project->users()
            ->wherePivot('user_id', $user->id)
            ->wherePivotIn('role', [ProjectUserRole::OWNER, ProjectUserRole::EDITOR])
            ->exists();
    }

    public function update(User $user, Task $task): bool
    {
        return $task->project->users()
            ->wherePivot('user_id', $user->id)
            ->wherePivotIn('role', [ProjectUserRole::OWNER, ProjectUserRole::EDITOR])
            ->exists();
    }

    public function delete(User $user, Task $task): bool
    {
        return $task->project->users()
            ->wherePivot('user_id', $user->id)
            ->wherePivotIn('role', [ProjectUserRole::OWNER, ProjectUserRole::EDITOR])
            ->exists();
    }
}
