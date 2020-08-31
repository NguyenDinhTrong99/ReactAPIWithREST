export async function api<T>(
  url = BASE_URL,
  method = "GET",
  config = {},
): Promise<T> {
  const response = await fetch(url, {
    method,
    ...config,
  });
  return await response.json();
}

export const BASE_URL =
  "https://5f4c778eea007b0016b1e0de.mockapi.io/api/v1/foods";
