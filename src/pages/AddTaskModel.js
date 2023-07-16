import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/AddTaskModal.css";

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleAddTask = () => {
    // ביצוע הפעולות הרלוונטיות כמו שמירת המשימה וכו'
    onAddTask({title: taskTitle , completed:completed });

    // ניקוי הטופס
    setTaskTitle("");
    setCompleted(false);

    // סגירת המודל
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Task Modal"
      className="add-task-modal"
    >
      <h2>Add New Task</h2>
      <form onSubmit={handleAddTask}>
        <label>
          Task text:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Add Task</button>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
