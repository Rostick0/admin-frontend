import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/rubrics/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/rubrics/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/rubrics/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/rubrics`, params),
  create: async ({ data }) => useFetcher().post(`/rubrics`, data),
};
