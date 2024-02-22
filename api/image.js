import useFetcher from "../utils/fetch";

const image = {
  get: async ({ id, params }) => useFetcher().get(`/image/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/image/${id}`, params),
  getAll: async ({ params }) => useFetcher().get(`/image`, params),
  create: async ({ data }) => useFetcher().post(`/image`, data, {}),
};

export default image;
