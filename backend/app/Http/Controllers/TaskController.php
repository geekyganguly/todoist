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
        // fetch all tasks for the task list
        $tasks = Task::with('project')->where('project_id', $project->id);
        $data = TaskResource::collection($tasks->orderBy('created_at', 'desc')->get());

        return response()->json(['data' => $data], 200);
    }

    public function store(Request $request, Project $project)
    {
        // validate the request
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // get user from request
        $user = $request->user();

        $task = Task::create([
            'title' => $request->title,
            'project_id' => $project->id,
            'user_id' => $user->id,
        ]);
        $data = new TaskResource($task);


        return response()->json(['data' => $data, 'message' => 'Task created'], 201);
    }

    public function update(Request $request, int $projectId, Task $task)
    {
        // validate the request
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'is_completed' => 'sometimes|boolean',
        ]);

        // update task
        $task->update($request->all());
        $data = new TaskResource($task);

        return response()->json(['data' => $data, 'message' => 'Task updated']);
    }

    public function destroy(int $projectId, Task $task)
    {
        // delete task
        $task->delete();

        return response()->json(['message' => 'Task deleted'], 200);
    }
}
