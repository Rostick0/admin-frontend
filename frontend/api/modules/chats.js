import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) => useFetcher().get(`/chats/${id}`, params),
  getAll: async ({ params }) => useFetcher().get(`/chats`, params),
  create: async ({ data }) => useFetcher().post(`/chats`, data),
};
