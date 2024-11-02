import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) =>
    useFetcher().get(`/ordering-products/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/ordering-products/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/ordering-products/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/ordering-products`, params),
  create: async ({ data }) => useFetcher().post(`/ordering-products`, data),
};
