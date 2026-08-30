const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

export type ApiErrorItem = {
  code: string;
  message: string;
};

export class ApiRequestError extends Error {
  status: number;
  errors?: ApiErrorItem[];

  constructor(message: string, status: number, errors?: ApiErrorItem[]) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.errors = errors;
  }
}

async function parseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), {
    ...init,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    const payload = data as { errors?: ApiErrorItem[]; message?: string } | null;
    const errors = Array.isArray(payload?.errors) ? payload.errors : undefined;
    const message =
      errors?.[0]?.message ?? payload?.message ?? `API request failed (${response.status})`;
    throw new ApiRequestError(message, response.status, errors);
  }

  return data as T;
}

