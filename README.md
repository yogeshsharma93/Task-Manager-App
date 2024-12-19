# Task Management Application

A comprehensive task management application built with React on the frontend and Node.js/Express for the backend. This application allows users to create, edit, delete, and toggle the completion status of tasks. MongoDB is used for storing task data.

## Features

- **Task Creation**: Users can create tasks by specifying a title and description.
- **Task Editing**: Modify the title, description, or completion status of existing tasks.
- **Task Deletion**: Easily remove tasks from the task list.
- **Task Completion Toggle**: Users can mark tasks as completed or pending.
- **Task Overview**: Displays tasks with their details, including the title, description, and action buttons (Edit, Delete, Complete).

## Tech Stack

- **Frontend**: React, Axios, Custom CSS
- **Backend**: Node.js, Express.js, MongoDB (with Mongoose for database management)
- **Database**: MongoDB (either local or cloud-hosted)
- **API**: RESTful API handling all task-related operations (CRUD)

## API Endpoints

The backend exposes the following API endpoints for interacting with tasks:
- **GET /tasks**: Fetch all tasks.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update a specific task (edit or mark as completed).
- **DELETE /tasks/:id**: Remove a task.
