# todoist - Task Management Application

A collaborative task management application built with Laravel (API Backend) and React (Frontend). The application allows users to create, manage, and share task lists with granular permission controls.

## Features

- **Task List Management**

  - Create multiple task lists to organize your tasks
  - Add, edit, and delete tasks within lists
  - Mark tasks as complete/incomplete

- **Collaboration**

  - Share task lists with other users
  - Granular permission control (Viewer/Editor)

- **User Interface**
  - Modern and responsive design using Tailwind CSS
  - Polished UI components from shadcn/ui
  - Intuitive task management interface

## Tech Stack

### Backend

- Laravel (PHP Framework)
- Postgres SQL Database
- RESTful API Architecture
- Docker containerization

### Frontend

- React.js
- Tailwind CSS
- shadcn/ui components
- Docker containerization

## Prerequisites

- Docker and Docker Compose installed on your system
- Git for version control
- A text editor of your choice

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/geekyganguly/todoist
cd todoist
```

### 2. Environment Configuration

Both the backend and frontend directories contain example environment files that need to be copied and configured.

#### Backend Environment Setup

```bash
# Navigate to backend directory
cd backend

# Copy the example environment file
cp .env.example .env

# Return to project root
cd ..
```

The backend `.env` file should contain:

```env
APP_NAME=todoist
APP_ENV=local
APP_KEY=base64:j4GuxOtN4GKjNQrMEMyR/cf9zNMx5a7kb/e2bHHF5Ho=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost:8000
APP_FRONTEND_URL=http://localhost:5173
APP_PORT=8000

DB_CONNECTION=pgsql
DB_HOST=database
DB_PORT=5432
DB_DATABASE=todoist
DB_USERNAME=laravel
DB_PASSWORD=password
```

#### Frontend Environment Setup

```bash
# Navigate to frontend directory
cd frontend

# Copy the example environment file
cp .env.example .env

# Return to project root
cd ..
```

The frontend `.env` file should contain:

```env
VITE_PORT=5173
VITE_API_URL=http://localhost:8000/api
```

### 3. Launch the Application

Start all services using Docker Compose:

```bash
docker compose -f docker-compose.local.yml --env-file ./backend/.env --env-file ./frontend/.env up --build

# or if yarn installed
yarn dev:start
```

### 4. Database Setup

Run database migrations:

```bash
docker compose -f docker-compose.local.yml --env-file ./backend/.env --env-file ./frontend/.env exec backend php artisan migrate

# or if yarn installed
yarn dev:migrate
```

## Accessing the Application

- Frontend App: [http://localhost:5173](http://localhost:5173)
- Backend API Base URL: [http://localhost:8000/api](http://localhost:8000/api)

## API Documentation

The API documentation is available [here](docs/api-docs/README.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
