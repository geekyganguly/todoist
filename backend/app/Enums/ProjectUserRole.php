<?php

namespace App\Enums;

enum ProjectUserRole: string
{
    case OWNER = 'owner';
    case VIEWER = 'viewer';
    case EDITOR = 'editor';

    public function label(): string
    {
        return match ($this) {
            ProjectUserRole::OWNER => 'Owner',
            ProjectUserRole::VIEWER => 'Viewer',
            ProjectUserRole::EDITOR => 'Editor',
        };
    }
}
