import useFetcher from "../../utils/fetch";

export default {
  read: async ({ id, data, params }) =>
    useFetcher().patch(`/notices/${id}/read`, data, params),
  readAll: async ({ id, data, params }) =>
    useFetcher().patch(`/notices/all/read`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/notices`, params),
};
