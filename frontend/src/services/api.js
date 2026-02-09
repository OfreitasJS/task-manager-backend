export async function getTasks() {
  const response = await fetch("http://localhost:3000/tasks")

  if (!response.ok) {
    throw new Error("Erro ao buscar tasks")
  }

  return response.json()
}
