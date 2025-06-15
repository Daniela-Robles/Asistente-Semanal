import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function WeekView({ plan }) {
  const days = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  if (!plan) return <p style={{ color: "#ddd", textAlign: "center" }}>No hay planificación aún.</p>;

  return (
    <div className="week">
      {days.map((day) => (
        <div key={day} className="day">
          <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
          <ul>
            {plan[day] && plan[day].length > 0 ? (
              plan[day].map((task, index) => (
                <li key={index}>
                  <FaCheckCircle
                    style={{ color: "#9f8eff", marginRight: 8, verticalAlign: "middle" }}
                    size={16}
                    aria-hidden="true"
                  />
                  {task}
                </li>
              ))
            ) : (
              <li style={{ fontStyle: "italic", color: "#857fe3aa" }}>No hay tareas asignadas.</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
