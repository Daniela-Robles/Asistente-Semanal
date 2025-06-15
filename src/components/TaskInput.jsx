// se ecriben metas y botón para generar planificación

import React, { useState } from 'react';

export default function TaskInput({ addTask, handleGenerate }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      addTask(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        placeholder="Escribe tu meta semanal"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Agregar</button>
      <button type="button" onClick={handleGenerate}>Generar con IA</button>
    </form>
  );
}
