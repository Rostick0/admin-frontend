import useFetcher from "../../utils/fetch";

export default {
  // get: async ({ id, params }) => useFetcher().get(`/statistic-days/${id}`, params),
  // delete: async ({ id, params }) =>
  //   useFetcher().delete(`/statistic-days/${id}`, params),
  // update: async ({ id, data, params }) =>
  //   useFetcher().patch(`/statistic-days/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/statistic-days`, params),
  increment: async ({ data }) =>
    useFetcher().post(`/statistic-days/increment`, data),
  // create: async ({ data }) => useFetcher().post(`/statistic-days`, data),
};
