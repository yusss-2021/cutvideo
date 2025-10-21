const BASE_URL = "http://localhost:4000/api/users";

export async function apiLogin(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function apiRegister(email, password) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function apiDashboard(token) {
  const res = await fetch(`${BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
