const API_URL = process.env.REACT_APP_API_URL || "https://phone-book-app.fly.dev/api";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  const json = await response.json();
  return json;
}

async function post<T>(path: string, body: any): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  return json;
}

async function put<T>(path: string, body: any): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  return json;
}

async function del<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
  });
  const json = await response.json();
  return json;
}

const api = {
  get,
  post,
  put,
  del,
}

export { api };