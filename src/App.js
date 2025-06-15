import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import WeekView from "./components/WeekView";
import { generatePlan } from "./utils/generatePlan";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [plan, setPlan] = useState(null);
  const [plannedTaskIds, setPlannedTaskIds] = useState([]);

  // Agregar tarea simple (meta semanal)
  const addTask = (taskText) => {
    const newTask = { id: Date.now(), text: taskText };
    setTasks((prev) => [...prev, newTask]);
  };

  // Limpiar cadena JSON de la IA
  const cleanJsonString = (str) => {
    return str
      .trim()
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "")
      .trim();
  };

  const handleGenerate = async () => {
    const unplannedTasks = tasks.filter((t) => !plannedTaskIds.includes(t.id));

    // Si ya existe un plan y no hay nuevas tareas
    if (plan && unplannedTasks.length === 0) {
      alert(
        "Ya tienes un horario generado.\n\nSi deseas agregar nuevas tareas, escríbelas en el campo de texto y presiona nuevamente este botón."
      );
      return;
    }

    // Si no hay tareas nuevas ni plan inicial
    if (tasks.length === 0) {
      alert("Agrega al menos una meta para generar la planificación.");
      return;
    }

    // Prompt para las tareas nuevas
    const prompt = `Organiza estas metas en un plan semanal, distribuyendo las tareas entre lunes a domingo de forma balanceada y realista. Devuélveme solo un JSON con días como claves y listas de tareas como valores. Metas: ${unplannedTasks
      .map((t) => t.text)
      .join(", ")}

**IMPORTANTE: Solo JSON válido, sin texto adicional.**`;

    try {
      const result = await generatePlan(prompt);
      let planObj;
      try {
        const cleanResult = cleanJsonString(result);
        planObj = JSON.parse(cleanResult);
      } catch (parseError) {
        console.error("Error al parsear JSON:", parseError);
        alert("La respuesta de la IA no es un JSON válido.");
        return;
      }

      const mergedPlan = plan ? { ...plan } : {};
      Object.entries(planObj).forEach(([day, newTasks]) => {
        if (!mergedPlan[day]) {
          mergedPlan[day] = [];
        }
        mergedPlan[day] = [...mergedPlan[day], ...newTasks];
      });

      // Actualizamos el plan y marcamos estas tareas como ya planificadas
      setPlan(mergedPlan);
      setPlannedTaskIds((prev) => [
        ...prev,
        ...unplannedTasks.map((t) => t.id),
      ]);
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
