import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import WeekView from "./components/WeekView";
import { generatePlan } from "./utils/generatePlan";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [plan, setPlan] = useState(null);

  // Agregar tarea simple (meta semanal)
  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText };
    setTasks((prev) => [...prev, newTask]);
  };

  // Función para limpiar la respuesta de la IA
  const cleanJsonString = (str) => {
    return str
      .trim()
      .replace(/^```json\s*/, "") // Elimina ```json al inicio
      .replace(/^```\s*/, "") // Elimina ``` al inicio (si no tiene json)
      .replace(/```$/, "") // Elimina ``` al final
      .trim();
  };

  // Generar planificación con IA
  const handleGenerate = async () => {
    if (tasks.length === 0) {
      alert("Agrega al menos una meta para generar la planificación.");
      return;
    }

    // Prompt mejorado para la IA
    const prompt = `Organiza estas metas en un plan semanal, distribuyendo las tareas entre lunes a domingo de forma balanceada y realista. Devuélveme solo un JSON con días como claves y listas de tareas como valores. Metas: ${tasks
      .map((t) => t.text)
      .join(", ")}

**IMPORTANTE: Solo JSON válido, sin texto adicional.**`;

    try {
      const result = await generatePlan(prompt);

      // Intentar parsear resultado como JSON después de limpiarlo
      let planObj;
      try {
        const cleanResult = cleanJsonString(result);
        planObj = JSON.parse(cleanResult);
      } catch (parseError) {
        console.error("Error al parsear JSON:", parseError);
        alert("La respuesta de la IA no es un JSON válido.");
        return;
      }
      console.log("Plan generado:", planObj);
      setPlan(planObj);
    } catch (error) {
      console.error("Error generando planificación:", error);
      alert("No se pudo generar la planificación. Revisa la consola.");
    }
  };

  return (
    <div>
      <h1>Asistente Semanal Inteligente</h1>
      <TaskInput addTask={addTask} handleGenerate={handleGenerate} />
      <WeekView plan={plan} />
    </div>
  );
}
