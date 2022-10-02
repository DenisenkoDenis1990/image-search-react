const ImageGalleryItem = ({ images, openModal }) => {
  return images.map(({ id, webformatURL, tags }) => {
    return (
      <li key={webformatURL} className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image"
          onClick={() => {
            openModal(id);
          }}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;
