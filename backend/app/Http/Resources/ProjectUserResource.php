<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectUserResource extends JsonResource
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
            'role' => $this->pivot->role,
            'name'  => $this->name,
            'email'  => $this->email,
            'username' => $this->username,
            'permissions' => [
                'can_update' => $request->user()->can('update', $this->resource->pivot),
                'can_delete' => $request->user()->can('delete', $this->resource->pivot),
            ]
        ];
    }
}
