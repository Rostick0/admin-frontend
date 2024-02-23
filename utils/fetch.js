import { getErrorData } from "./base";

export default function useFetcher() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NtMzE1NjMudG13ZWIucnUvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3MDg3MDI2MTQsImV4cCI6MTcwOTMwNzQxNCwibmJmIjoxNzA4NzAyNjE0LCJqdGkiOiJGaDFFZXBCNFNtZzJRZUZDIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.kqDT6QrZLr_Mn-X2AmrmtqHaGdq5F3PFL0Vukcb7EIo" ??
    useCookie("ag-accessToken", { maxAge: 60 * 60 * 24 * 7 }).value;
  const config = useRuntimeConfig();
  const baseUrl = config.public.API_URL ?? "https://cm31563.tmweb.ru/api/v1";

  const initialParams = {
    baseURL: baseUrl,
    headers: {},
  };

  if (token && token !== "") {
    initialParams.headers.Authorization = `Bearer ${token}`;
  }

  const apiFetch = $fetch.create(initialParams);

  return {
    get: async (url, params = {}, headers = {}) => {
      let signal = params.signal;
      delete params.signal;
      let opts = {
        signal: signal,
        method: "GET",
        params,
        headers: { ...initialParams?.headers, ...headers },
      };

      return await apiFetch(url, opts)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return getErrorData(error, signal?.aborted)?.popup();
        });
    },
    post: async (url, body, config = {}) => {
      const headers = {
        ...initialParams?.headers,
        ...config?.headers,
      };

      const conf = {
        ...config,
        headers,
      };

      return await apiFetch(url, { method: "POST", body, ...conf })
        .then(async (res) => {
          if (res instanceof Blob) {
            return JSON.parse(await res.text());
          }
          return res;
        })
        .catch((error) => {
          let res = getErrorData(error);
          // res?.popup();
          return res;
        });
    },
    patch: async (url, body, config = {}) => {
      return await apiFetch(url, { method: "PATCH", body, ...config })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          let res = getErrorData(error);
          // res?.popup();
          return res;
        });
    },
    put: async (url, body, config = {}) => {
      return await apiFetch(url, { method: "PUT", body, ...config })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          let res = getErrorData(error);
          // res?.popup();
          return res;
        });
    },
    delete: async (url, config = {}) => {
      return await apiFetch(url, { method: "DELETE", ...config })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return getErrorData(error);
        });
    },
  };
}
