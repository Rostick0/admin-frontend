import useFetcher from "../utils/fetch";

const propertyItems = {
  get: async ({ id, params }) => useFetcher().get(`/propertyItems/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/propertyItems/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/propertyItems/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/propertyItems`, params),
  create: async ({ data }) => useFetcher().post(`/propertyItems`, data),
};

export default propertyItems;
