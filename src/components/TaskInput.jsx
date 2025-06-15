import React, { useState } from "react";

export default function TaskInput({ addTask, handleGenerate }) {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("media");

  const handleAdd = () => {
    if (!taskText.trim()) return;
    addTask({ text: taskText.trim(), priority });
    setTaskText("");
    setPriority("media");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Agrega una tarea"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="alta">🔴 Urgente</option>
        <option value="media">🟡 Medio</option>
        <option value="baja">🟢 No urgente</option>
      </select>
      <button onClick={handleAdd}>Agregar tarea</button>
      <button onClick={handleGenerate}>Generar con IA</button>
    </div>
  );
}
