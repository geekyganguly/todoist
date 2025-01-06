<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\User;

class ProjectUserPolicy
{
    public function viewAny(User $user, Project $project): bool
    {
        return $user->can('share', $project);
    }

    public function create(User $user, Project $project): bool
    {
        return $user->can('share', $project);
    }

    public function update(User $user, ProjectUser $projectUser): bool
    {
        return $user->can('share', $projectUser->project) && $user->isNot($projectUser->user);
    }

    public function delete(User $user, ProjectUser $projectUser): bool
    {
        return $user->can('share', $projectUser->project) && $user->isNot($projectUser->user);
    }
}
