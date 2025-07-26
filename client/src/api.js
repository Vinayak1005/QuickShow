const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchUser() {
  const response = await fetch(`${BASE_URL}/api/user`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}
