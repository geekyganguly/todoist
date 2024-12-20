<?php

namespace App\Http\Resources;

use App\Models\SharedProject;
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
        $user = $request->user();
        $sharing = SharedProject::where('project_id', $this->id)->where('user_id', $user->id)->first();

        return [
            'id' => $this->id,
            'title' => $this->title,
            'is_owner' => $this->user_id == $user->id,
            'is_shared' => $sharing ? true : false,
            'is_editor' => $sharing ? $sharing->permission == 'editor' : false,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
