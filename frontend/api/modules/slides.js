import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/slides/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/slides/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/slides/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/slides`, params),
  create: async ({ data }) => useFetcher().post(`/slides`, data),
};
