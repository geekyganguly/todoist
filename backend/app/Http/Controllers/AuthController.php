<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Http\Resources\UserResource;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);
        $data = new UserResource($user);

        return response()->json(['data' => $data, 'message' => 'User registered successfully'], 200);
    }

    public function login(Request $request)
    {
        // validate the request
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        // fetch user by email
        $user = User::where('email', $request->email)->first();

        // check if user exists and password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 422);
        }

        // generate token
        $token = $user->createToken($user->username)->plainTextToken;

        return response()->json([
            'data' => [
                'user' => new UserResource($user),
                'token' => $token
            ],
            'message' => 'Logged in successfully',
        ], 200);
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function getProfile(Request $request)
    {
        // get user from request
        $user = $request->user();

        return response()->json(['data' => $user], 200);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $request->user()->id,
            'username' => 'sometimes|string|max:255|unique:users,username,' . $request->user()->id,
        ]);

        // get user from request
        $user = $request->user();

        // update user
        $user->update($request->all());
        $data = new UserResource($user);


        return response()->json(['data' => $data, 'message' => 'Profile updated successfully'], 200);
    }

    public function changePassword(Request $request)
    {
        // validate the request
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        // get user from request
        $user = $request->user();

        // check if the current password is correct
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect',
                'errors' => ['current_password' => ['Current password is incorrect']],
            ], 422);
        }

        // hash and update the password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }
}
