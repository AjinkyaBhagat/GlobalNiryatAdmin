export const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return await response.json();
};
