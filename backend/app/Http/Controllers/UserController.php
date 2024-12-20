<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function search(Request $request, $search)
    {
        /// get user from request
        $user = $request->user();

        // fetch users from database
        $users = User::where('id', '!=', $user->id)->where('username', 'LIKE', "%$search%");

        return response()->json([
            'data' => $users->get(),
        ], 200);
    }
}
