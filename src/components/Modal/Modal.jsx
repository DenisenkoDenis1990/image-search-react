const Modal = ({ id, images, closeModal }) => {
  return images.map(image => {
    if (image.id === id) {
      return (
        <div className="Overlay">
          <div className="Modal">
            <img
              src={image.largeImageURL}
              alt={image.tag}
              onClick={closeModal}
            />
          </div>
        </div>
      );
    }
  });
};

export default Modal;
