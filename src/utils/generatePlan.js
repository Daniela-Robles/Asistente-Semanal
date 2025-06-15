const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.REACT_APP_GROQ_API_KEY;

export async function generatePlan(prompt) {
  // Cambia aquí por un modelo válido que tengas permitido en tu cuenta Groq
  const modeloValido = "llama-3.3-70b-versatile"; // ejemplo, cambia según los modelos que tengas

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: modeloValido,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Groq API Error response:", errorText);
    throw new Error(`Groq API Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  // Retornamos el contenido del mensaje generado
  return data.choices[0].message.content;
}
