<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function search(Request $request, $search)
    {
        /// get user from request
        $user = $request->user();

        // fetch users from database
        $users = User::where('id', '!=', $user->id)->where('username', 'LIKE', "%$search%");
        $data = UserResource::collection($users->get());

        return response()->json(['data' => $data], 200);
    }
}
