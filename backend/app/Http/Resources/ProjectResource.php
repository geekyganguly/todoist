<?php

namespace App\Http\Resources;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'is_shared' => $request->user()->isNot($this->owner()),
            'permissions' => [
                'can_update' => $request->user()->can('update', $this->resource),
                'can_delete' => $request->user()->can('delete', $this->resource),
                'can_share' => $request->user()->can('share', $this->resource),
                'can_create_task' => $request->user()->can('create', [Task::class, $this->resource]),
            ]
        ];
    }
}
