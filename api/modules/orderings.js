import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/orderings/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/orderings/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/orderings/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/orderings`, params),
  create: async ({ data }) => useFetcher().post(`/orderings`, data),
};
