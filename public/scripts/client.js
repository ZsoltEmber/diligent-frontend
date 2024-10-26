export async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/data");
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return error.message;
    }  
}

export async function addTodo(title, description) {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}