import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/properties/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/properties/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/properties/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/properties`, params),
  create: async ({ data }) => useFetcher().post(`/properties`, data),
};
