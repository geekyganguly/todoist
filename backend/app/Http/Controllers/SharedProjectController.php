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
        // fetch shared projects
        $sharedProjects = SharedProject::with(['user', 'project'])->where('project_id', $project->id);
        $data = SharedProjectResource::collection($sharedProjects->orderBy('created_at', 'desc')->get());

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

        $sharedProjects = [];

        foreach ($request->user_ids as $userId) {
            $sharedProject = SharedProject::updateOrCreate(
                [
                    'project_id' => $project->id,
                    'user_id' => $userId,
                ],
                [

                    'permission' => $request->permission,
                ]
            );

            $sharedProjects[] = $sharedProject;
        }

        $data = SharedProjectResource::collection($sharedProjects);

        return response()->json(['data' => $data, 'message' =>  "Project shared successfully"], 200);
    }


    public function update(Request $request, int $projectId, int $userId)
    {
        // fetch shared project
        $sharedProject = SharedProject::where(['project_id' => $projectId, 'user_id' => $userId])->firstOrFail();

        // validate the request
        $request->validate([
            'permission' => 'sometimes|in:viewer,editor',
        ]);

        // update shared project
        $sharedProject->update($request->all());

        $data = new SharedProjectResource($sharedProject);

        return response()->json(['data' => $data, 'message' => "Permission updated successfully"], 200);
    }


    public function destroy(int $projectId, int $userId)
    {
        // fetch shared project
        $sharedProject = SharedProject::where(['project_id' => $projectId, 'user_id' => $userId])->firstOrFail();

        // delete shared project 
        $sharedProject->delete();

        return response()->json(['message' => 'Project sharing removed'], 200);
    }
}
