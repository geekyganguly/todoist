<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\SharedProjectResource;
use App\Models\SharedProject;
use App\Models\Project;

class SharedProjectController extends Controller
{

    public function index(Request $request, Project $project)
    {
        // fetch shared project
        $sharedProject = SharedProject::with(['user', 'project'])->where('project_id', $project->id);
        $data = SharedProjectResource::collection($sharedProject->orderBy('created_at', 'desc')->get());

        return response()->json(['data' => $data], 200);
    }

    public function store(Request $request, Project $project)
    {
        // validate the request
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'required|integer|exists:users,id',
            'permission' => 'required|in:viewer,editor',
        ]);

        foreach ($request->user_ids as $userId) {
            SharedProject::updateOrCreate(
                [
                    'project_id' => $project->id,
                    'user_id' => $userId,
                ],
                [

                    'permission' => $request->permission,
                ]
            );
        }

        return response()->json(['message' => 'Shared project created'], 201);
    }


    public function update(Request $request, int $projectId, int $sharedProjectId)
    {
        // fetch shared project
        $sharedProject = SharedProject::findOrFail($sharedProjectId);

        // validate the request
        $request->validate([
            'permission' => 'sometimes|in:viewer,editor',
        ]);

        // update shared project
        $sharedProject->update($request->all());

        return response()->json(['message' => 'Shared project updated']);
    }


    public function destroy(int $projectId, int $sharedProjectId)
    {
        // fetch shared project
        $sharedProject = SharedProject::findOrFail($sharedProjectId);

        // delete shared project 
        $sharedProject->delete();

        return response()->json(['message' => 'Shared project deleted'], 200);
    }
}
