<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use App\Enums\ProjectUserRole;
use App\Http\Resources\ProjectUserResource;
use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\User;

class ProjectUserController extends Controller
{
    public function index(Request $request, Project $project)
    {
        $this->authorize('viewAny', [ProjectUser::class, $project]);

        // fetch project contributors
        $contributors = $project->contributors()
            ->wherePivotNotIn('user_id', [$request->user()->id]);

        // apply ordering
        $contributors = $contributors->orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => ProjectUserResource::collection($contributors),
        ], 200);
    }


    public function store(Request $request, Project $project)
    {
        $this->authorize('create', [ProjectUser::class, $project]);

        // validate the request
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'required|integer|exists:users,id',
            'role' => ['required', Rule::enum(ProjectUserRole::class)->except([ProjectUserRole::OWNER])],
        ]);

        // get existing user ids
        $existingUserIds = $project->users()
            ->whereIn('user_id', $request->user_ids)
            ->pluck('user_id');

        // get diff between existing user ids and request user ids
        $newUserIds = array_diff($request->user_ids, $existingUserIds->toArray());

        // attach unique user ids to project
        $project->users()
            ->attach(array_fill_keys($newUserIds, ['role' => $request->role]));

        // get attached users
        $users = $project->users()
            ->whereIn('user_id', $newUserIds)
            ->get();

        return response()->json([
            'data' => ProjectUserResource::collection($users),
            'message' =>  "Project shared successfully"
        ], 200);
    }


    public function update(Request $request, Project $project, User $user)
    {
        // fetch contributor
        $contributor = $project->contributors()
            ->wherePivot('user_id', $user->id)
            ->firstOrFail();

        // check if can update
        $this->authorize('update', $contributor->pivot);

        // validate the request
        $request->validate([
            'role' => ['required', Rule::enum(ProjectUserRole::class)->except([ProjectUserRole::OWNER])],
        ]);

        // update data
        $project->contributors()
            ->updateExistingPivot($contributor->id, $request->all());

        // refetch contributor
        $contributor = $project->contributors()
            ->wherePivot('user_id', $user->id)
            ->first();

        return response()->json([
            'data' =>  new ProjectUserResource($contributor),
            'message' =>  "Project user updated successfully"
        ], 200);
    }


    public function destroy(Project $project, User $user)
    {
        // fetch contributor
        $contributor = $project->contributors()
            ->wherePivot('user_id', $user->id)
            ->firstOrFail();

        // check if can delete
        $this->authorize('delete', $contributor->pivot);

        // remove contributor from project
        $project->contributors()
            ->detach($contributor->id);

        return response()->json([
            'message' =>  "Project user removed successfully"
        ], 200);
    }
}
