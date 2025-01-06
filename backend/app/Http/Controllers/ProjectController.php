<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Project;
use App\Enums\ProjectUserRole;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Project::class);

        /// get user from request
        $user = $request->user();

        // fetch projects related to user [owner, editor or viewer]
        $projects = $user->projects()->with(['users']);

        // apply ordering and pagination
        $projects = $projects->orderBy('created_at', 'desc')->simplePaginate(6);

        return response()->json([
            'data' => ProjectResource::collection($projects),
            'meta' => [
                "has_more_pages" => $projects->hasMorePages(),
            ],
        ], 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Project::class);

        // validate the request
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // get user from request
        $user = $request->user();

        // create project
        $project = Project::create([
            'title' => $request->title,
        ]);

        // assign project to user and make owner
        $project->users()->attach($user->id, ["role" => ProjectUserRole::OWNER]);

        return response()->json([
            'data' => new ProjectResource($project),
            'message' => 'Project created'
        ], 201);
    }


    public function show(Project $project)
    {
        $this->authorize('view', $project);

        return response()->json([
            'data' => new ProjectResource($project)
        ]);
    }


    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        // validate the request
        $request->validate([
            'title' => 'sometimes|string|max:255',
        ]);

        // update project
        $project->update($request->all());

        return response()->json([
            'data' => new ProjectResource($project),
            'message' => 'Project updated'
        ]);
    }

    public function destroy(Request $request, Project $project)
    {
        $this->authorize('delete', $project);

        // delete project
        $project->delete();

        return response()->json([
            'message' => 'Project deleted'
        ], 203);
    }
}
