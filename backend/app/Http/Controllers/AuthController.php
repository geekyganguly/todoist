<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Events\Registered;

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

        // Trigger registered event (for verification email etc.)
        event(new Registered($user));

        return response()->json([
            'data' => new UserResource($user),
            'message' => 'User registered successfully'
        ], 200);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        Password::sendResetLink(
            $request->only('email')
        );

        return response()->json(['message' => 'Password reset link sent'], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('token', 'email', 'password', 'password_confirmation'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ]);

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => "Password reset successful"], 200);
        }

        return response()->json(['message' => 'Invalid token'], 422);
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

    public function sendVerificationEmail(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified'
            ], 200);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification link sent'
        ], 200);
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'id' => 'required|string',
            'hash' => 'required|string',
        ]);

        if (!hash_equals((string) $request->user()->getKey(), $request->id)) {
            return response()->json([
                'message' => 'Invalid link'
            ], 422);
        }

        if (!hash_equals(sha1($request->user()->getEmailForVerification()), $request->hash)) {
            return response()->json([
                'message' => 'Invalid link'
            ], 422);
        }

        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified'
            ], 200);
        }

        $request->user()->markEmailAsVerified();
        event(new Verified($request->user()));

        return response()->json([
            'message' => 'Email verified successfully'
        ], 200);
    }

    public function getProfile(Request $request)
    {
        // get user from request
        $user = $request->user();
        $data = new UserResource($user);

        return response()->json(['data' => $data], 200);
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
