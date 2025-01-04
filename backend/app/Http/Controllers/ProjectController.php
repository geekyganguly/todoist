<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Models\SharedProject;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        /// get user from request
        $user = $request->user();

        // fetch projects
        $projects = Project::where('user_id', $user->id);

        // fetch shared projects
        $sharedProjects = SharedProject::where('user_id', $user->id)->pluck('project_id');
        $sharedProjects = Project::whereIn('id', $sharedProjects);

        $projects = $projects->union($sharedProjects)->orderBy('created_at', 'desc')->simplePaginate(6);
        $data = ProjectResource::collection($projects);

        return response()->json([
            'data' => $data,
            'meta' => [
                "has_more_pages" => $projects->hasMorePages(),
            ]
        ], 200);
    }

    public function store(Request $request)
    {
        // validate the request
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // get user from request
        $user = $request->user();

        // create project
        $project = Project::create([
            'user_id' => $user->id,
            'title' => $request->title,
        ]);

        $data = new ProjectResource($project);

        return response()->json(['data' => $data, 'message' => 'Project created'], 201);
    }


    public function show(Project $project)
    {
        $data = new ProjectResource($project);
        return response()->json(['data' => $data]);
    }


    public function update(Request $request, Project $project)
    {
        // validate the request
        $request->validate([
            'title' => 'sometimes|string|max:255',
        ]);

        // update project
        $project->update($request->all());
        $data = new ProjectResource($project);

        return response()->json(['data' => $data, 'message' => 'Project updated']);
    }

    public function destroy(Project $project)
    {
        // delete project
        $project->delete();

        return response()->json(['message' => 'Project deleted'], 203);
    }
}
