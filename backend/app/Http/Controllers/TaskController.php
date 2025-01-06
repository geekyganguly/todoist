<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request, Project $project)
    {
        $this->authorize('viewAny', [Task::class, $project]);

        // fetch all tasks for the project
        $tasks = $project->tasks();

        // apply ordering and pagination
        $tasks = $tasks->orderBy('created_at', 'desc')->get();

        return response()->json([
            'data' => TaskResource::collection($tasks)
        ], 200);
    }


    public function store(Request $request, Project $project)
    {
        $this->authorize('create', [Task::class, $project]);

        // validate the request
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // create task
        $task = Task::create([
            'title' => $request->title,
            'project_id' => $project->id,
        ]);

        return response()->json([
            'data' => new TaskResource($task),
            'message' => 'Task created'
        ], 201);
    }


    public function show(Project $project, Task $task)
    {
        $this->authorize('view', $task);

        return response()->json([
            'data' => new TaskResource($task)
        ]);
    }


    public function update(Request $request, Project $project, Task $task)
    {
        $this->authorize('update', $task);

        // validate the request
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'is_completed' => 'sometimes|boolean',
        ]);

        // update task
        $task->update($request->all());

        return response()->json([
            'data' => new TaskResource($task),
            'message' => 'Task updated'
        ]);
    }


    public function destroy(Project $project, Task $task)
    {
        $this->authorize('delete', $task);

        // delete task
        $task->delete();

        return response()->json([
            'message' => 'Task deleted'
        ], 200);
    }
}
