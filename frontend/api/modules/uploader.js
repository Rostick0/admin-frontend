import useFetcher from "../../utils/fetch";

export default {
  download: async ({ params }) =>
    useFetcher().get(`/uploader/download`, params),
  upload: async ({ data }) => useFetcher().post(`/uploader/upload`, data),
};
