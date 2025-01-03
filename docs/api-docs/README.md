# Todoist API Documentation

## Overview

RESTful API documentation for the todoist task management application. This API allows you to manage task lists, tasks, and user collaborations.

## Base URL

```
http://localhost:8000/api
```

## Authentication

All API requests require authentication using Bearer token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

## API Endpoints

### Authentication

#### Register User

```
POST /register
```

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "username": "string",
  "password": "string"
}
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "number",
    "name": "string",
    "email": "string",
    "username": "string",
    "created_at": "string",
    "updated_at": "string"
  },
  "message": "User registered successfully"
}
```

#### Login

```
POST /login
```

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** `200 OK`

```json
{
  "data": {
    "user": {
      "id": "number",
      "name": "string",
      "email": "string",
      "username": "string",
      "created_at": "string",
      "updated_at": "string"
    },
    "token": "string"
  },
  "message": "Logged in successfully"
}
```

#### Logout

```
DELETE /logout
```

**Response:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

#### Forgot Password

```
POST /forgot-password
```

**Request Body:**

```json
{
  "email": "string"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password reset link sent"
}
```

#### Reset Password

```
POST /reset-password
```

**Request Body:**

```json
{
  "token": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password reset successful"
}
```

#### Get Profile

```
GET /me
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "number",
    "name": "string",
    "email": "string",
    "username": "string",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

#### Update Profile

```
POST /me
```

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "username": "string"
}
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "number",
    "name": "string",
    "email": "string",
    "username": "string",
    "created_at": "string",
    "updated_at": "string"
  },
  "message": "Profile updated successfully"
}
```

#### Change Password

```
POST /change-password
```

**Request Body:**

```json
{
  "current_password": "string",
  "new_password": "string",
  "new_password_confirmation": "string"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password changed successfully"
}
```

### Users

#### Search Users

```
GET /users/search/{query}
```

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "number",
      "name": "string",
      "email": "string",
      "username": "string",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

### Projects (Task Lists)

#### Get All Projects

```
GET /projects
```

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "integer",
      "title": "string",
      "is_owner": "boolean",
      "is_shared": "boolean",
      "is_editor": "boolean",
      "created_at": "string",
      "updated_at": "string"
    }
  ]
}
```

#### Create Project

```
POST /projects
```

**Request Body:**

```json
{
  "title": "string"
}
```

**Response:** `201 Created`

```json
{
  "data": {
    "id": "integer",
    "title": "string",
    "is_owner": "boolean",
    "is_shared": "boolean",
    "is_editor": "boolean",
    "created_at": "string",
    "updated_at": "string"
  },
  "message": "Project created"
}
```

#### Get Project

```
GET /projects/{id}
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "integer",
    "title": "string",
    "is_owner": "boolean",
    "is_shared": "boolean",
    "is_editor": "boolean",
    "created_at": "string",
    "updated_at": "string"
  }
}
```

#### Update Project

```
PUT /projects/{id}
```

**Request Body:**

```json
{
  "title": "string"
}
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "integer",
    "title": "string",
    "is_owner": "boolean",
    "is_shared": "boolean",
    "is_editor": "boolean",
    "created_at": "string",
    "updated_at": "string"
  },
  "message": "Project updated"
}
```

#### Delete Project

```
DELETE /projects/{id}
```

**Response:** `200 OK`

```json
{
  "message": "Project deleted"
}
```

### Tasks

#### Get Tasks

```
GET /projects/{project_id}/tasks
```

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "number",
      "title": "string",
      "is_completed": "boolean",
      "created_at": "string",
      "updated_at": "string",
      "project": {
        "id": "number",
        "title": "string",
        "is_owner": "boolean",
        "is_shared": "boolean",
        "is_editor": "boolean",
        "created_at": "string",
        "updated_at": "string"
      }
    }
  ]
}
```

#### Create Task

```
POST /projects/{project_id}/tasks
```

**Request Body:**

```json
{
  "title": "string"
}
```

**Response:** `201 Created`

```json
{
  "data": {
    "id": "number",
    "title": "string",
    "is_completed": "boolean",
    "created_at": "string",
    "updated_at": "string",
    "project": {
      "id": "number",
      "title": "string",
      "is_owner": "boolean",
      "is_shared": "boolean",
      "is_editor": "boolean",
      "created_at": "string",
      "updated_at": "string"
    }
  },
  "message": "Task created"
}
```

#### Update Task

```
PUT /projects/{project_id}/tasks/{task_id}
```

**Request Body:**

```json
{
  "title": "string"
}
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "number",
    "title": "string",
    "is_completed": "boolean",
    "created_at": "string",
    "updated_at": "string",
    "project": {
      "id": "number",
      "title": "string",
      "is_owner": "boolean",
      "is_shared": "boolean",
      "is_editor": "boolean",
      "created_at": "string",
      "updated_at": "string"
    }
  },
  "message": "Task updated"
}
```

#### Delete Task

```
DELETE /projects/{project_id}/tasks/{task_id}
```

**Response:** `200 OK`

```json
{
  "message": "Task deleted"
}
```

### Sharing & Permissions

#### Get Project Share List

```
GET /projects/{project_id}/share
```

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "number",
      "permission": "string",
      "user": {
        "id": "number",
        "name": "string",
        "email": "string",
        "username": "string",
        "created_at": "string",
        "updated_at": "string"
      },
      "project": {
        "id": "number",
        "title": "string",
        "is_owner": "boolean",
        "is_shared": "boolean",
        "is_editor": "boolean",
        "created_at": "string",
        "updated_at": "string"
      }
    }
  ]
}
```

#### Share Project

```
POST /projects/{project_id}/share
```

**Request Body:**

```json
{
  "user_ids": ["number"],
  "permission": "string" // "viewer" or "editor"
}
```

**Response:** `200 OK`

```json
{
  "data": [
    {
      "id": "number",
      "permission": "string",
      "user": {
        "id": "number",
        "name": "string",
        "email": "string",
        "username": "string",
        "created_at": "string",
        "updated_at": "string"
      },
      "project": {
        "id": "number",
        "title": "string",
        "is_owner": "boolean",
        "is_shared": "boolean",
        "is_editor": "boolean",
        "created_at": "string",
        "updated_at": "string"
      }
    }
  ],
  "message": "Project shared successfully"
}
```

#### Update Share Permission

```
PUT /projects/{project_id}/share/{user_id}
```

**Request Body:**

```json
{
  "permission": "string" // "viewer" or "editor"
}
```

**Response:** `200 OK`

```json
{
  "data": {
    "id": "number",
    "permission": "string",
    "user": {
      "id": "number",
      "name": "string",
      "email": "string",
      "username": "string",
      "created_at": "string",
      "updated_at": "string"
    },
    "project": {
      "id": "number",
      "title": "string",
      "is_owner": "boolean",
      "is_shared": "boolean",
      "is_editor": "boolean",
      "created_at": "string",
      "updated_at": "string"
    }
  },
  "message": "Permission updated successfully"
}
```

#### Remove Share Access

```
DELETE /project/{project_id}/share/{user_id}
```

**Response:** `200 OK`

```json
{
  "message": "Project sharing removed"
}
```

## Error Responses

### Common Error Formats

```json
{
  "message": "string",
  "errors": {
    "field": ["error message"]
  }
}
```
