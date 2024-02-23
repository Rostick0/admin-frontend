import api from "~/api";

export default () => {
  const createImage = async (image) => {
    const formData = new FormData();

    formData.append("image", image);

    const response = await api.image.create({
      data: formData,
    });

    return await response.data;
  };

  const createImages = async (images) => {
    let data = [];

    for (let i = 0; i < images.length; i++) {
      if (images[i]?.file && typeof images[i]?.id === "string") {
        const image = await createImage(images[i]?.file);
        data.push(image?.id);
      }
    }

    return data;
  };

  const getImageIdFrom = async (image, oldImage) => {
    return typeof image !== "string"
      ? await createImage(image).then((resp) => resp?.id)
      : oldImage?.id;
  };

  const { $toast } = useNuxtApp();
  const getImageIdsFrom = async (images, oldImages) => {
    try {
      const imagesNew = images?.filter?.((i) => typeof i.id === "string") ?? [];
      const newIds = await createImages(imagesNew);
      const idsOld =
        images
          ?.filter((i) => typeof i === "string")
          .map((i) => oldImages.find((pI) => pI.image.path === i).image?.id) ??
        [];
      return [...newIds, ...idsOld]?.join() ?? "";
    } catch (error) {
      $toast.error(error?.data?.errors.image.join("\n"));
    }
  };

  return {
    createImage,
    createImages,
    getImageIdFrom,
    getImageIdsFrom,
  };
};
