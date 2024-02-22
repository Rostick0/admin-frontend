import useFetcher from "../utils/fetch";

const file = {
  get: async ({ id, params }) => useFetcher().get(`/file/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/file/${id}`, params),
  getAll: async ({ params }) => useFetcher().get(`/file`, params),
  create: async ({ data }) => useFetcher().post(`/file`, data),
};

export default file;
