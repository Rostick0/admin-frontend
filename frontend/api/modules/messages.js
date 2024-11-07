import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/messages/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/messages/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/messages/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/messages`, params),
  create: async ({ data }) => useFetcher().post(`/messages`, data, {}),
};
