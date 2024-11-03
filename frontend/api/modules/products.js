import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/products/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/products/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/products/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/products`, params),
  create: async ({ data }) => useFetcher().post(`/products`, data),
};
