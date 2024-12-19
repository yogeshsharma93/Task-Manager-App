import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskManager.css";  // Importing the external CSS file

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", isCompleted: false });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8000/tasks");
            setTasks(response.data);
            setError("");
        } catch (err) {
            setError("Failed to fetch tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            setError("Title and Description are required!");
            return;
        }

        try {
            setLoading(true);
            if (editingTaskId) {
                // Update task if editingTaskId is set
                await axios.put(`http://localhost:8000/tasks/${editingTaskId}`, formData);
                setEditingTaskId(null); // Reset editing state
            } else {
                // Add new task if not editing
                await axios.post("http://localhost:8000/tasks", formData);
            }

            setFormData({ title: "", description: "", isCompleted: false }); // Clear the form
            fetchTasks(); // Refresh task list
            setError("");
        } catch (err) {
            setError(editingTaskId ? "Failed to update task" : "Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:8000/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            setError("Failed to delete task");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (task) => {
        setEditingTaskId(task._id); // Set the task id being edited
        setFormData({ title: task.title, description: task.description, isCompleted: task.isCompleted }); // Fill the form with task data
    };

    const handleCompleteToggle = async (id) => {
        try {
            const taskToUpdate = tasks.find((task) => task._id === id);
            const updatedTask = await axios.put(`http://localhost:8000/tasks/${id}`, {
                ...taskToUpdate,
                isCompleted: !taskToUpdate.isCompleted,
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? updatedTask.data : task
                )
            );
        } catch (err) {
            setError("Failed to toggle task completion");
        }
    };

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="task-input"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="task-input"
                />
                
                {/* Render the Completed checkbox only when editing a task */}
                {editingTaskId && (
                    <label>
                        Completed:
                        <input
                            type="checkbox"
                            checked={formData.isCompleted}
                            onChange={(e) => setFormData({ ...formData, isCompleted: e.target.checked })}
                        />
                    </label>
                )}

                <button type="submit" disabled={loading} className="submit-button">
                    {editingTaskId ? "Update Task" : "Add Task"}
                </button>
            </form>

            {loading && <p>Loading tasks...</p>}

            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task._id} className="task-item">
                        <div className="task-title">
                            <strong>{task.title}</strong>
                            <span className={task.isCompleted ? "completed" : "pending"}>
                                {task.isCompleted ? " (Completed)" : " (Pending)"}
                            </span>
                        </div>
                        <div className="task-description">
                            <p>{task.description}</p>
                        </div>
                        <div className="task-actions">
                            <button onClick={() => handleEdit(task)} className="edit-button">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(task._id)} className="delete-button">
                                Delete
                            </button>
                            <button onClick={() => handleCompleteToggle(task._id)} className="toggle-button">
                                Toggle Complete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;
