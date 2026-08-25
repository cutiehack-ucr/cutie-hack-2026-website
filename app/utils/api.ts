type API = {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: object;
  };
  
  export const api = async ({ url, method, body }: API) => {
    const response = await fetch(url, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  
    const data = await response.json();
  
    return data;
  };
  