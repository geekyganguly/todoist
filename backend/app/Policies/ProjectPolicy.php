<?php

namespace App\Policies;

use App\Enums\ProjectUserRole;
use App\Models\Project;
use App\Models\User;

class ProjectPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Project $project): bool
    {
        return $project->users()
            ->wherePivot('user_id', $user->id)
            ->exists();
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Project $project): bool
    {
        return $project->users()
            ->wherePivot('user_id', $user->id)
            ->wherePivot('role', ProjectUserRole::OWNER)
            ->exists();
    }

    public function delete(User $user, Project $project): bool
    {
        return $project->users()
            ->wherePivot('user_id', $user->id)
            ->wherePivot('role', ProjectUserRole::OWNER)
            ->exists();
    }

    public function share(User $user, Project $project): bool
    {
        return $project->users()
            ->wherePivot('user_id', $user->id)
            ->wherePivot('role', ProjectUserRole::OWNER)
            ->exists();
    }
}
