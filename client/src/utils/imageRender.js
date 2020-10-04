const renderCardImages = (images) => {
  if (images.length > 0) {
    return images[0].url;
  } else {
    return "/images/image_not_availble.png";
  }
};
export default renderCardImages;
