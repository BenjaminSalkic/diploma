const BASE_URL = import.meta.env.VITE_API_URL ?? ''

const TOKEN_KEY = 'auth_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })

  if (res.status === 401) {
    setToken(null)
  }

  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`
    try {
      const text = await res.text()
      if (text) message = text
    } catch {}
    const err = new Error(message)
    err.status = res.status
    throw err
  }

  if (res.status === 204) return null
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => {
    if (body instanceof FormData) {
      const token = getToken();
      return fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        body: body,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }).then(res => {
        if (res.status === 401) setToken(null);
        if (!res.ok) throw new Error('Upload failed');
        return res.json();
      });
    }
    return request(path, { method: 'POST', body: JSON.stringify(body) });
  },
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
  upload: async (path, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(path, formData);
  }
}

export async function uploadFile(file) {
  const form = new FormData()
  form.append('file', file)
  const token = getToken()
  const res = await fetch(`${BASE_URL}/api/uploads`, {
    method: 'POST',
    body: form,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (res.status === 401) setToken(null)
  if (!res.ok) throw new Error('Upload failed')
  const data = await res.json()
  return data.path
}
