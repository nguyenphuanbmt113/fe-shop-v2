import React, { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
export const DetailImage = ({ product }) => {
  const arrayImage = [
    `/images/${product.image1}`,
    `/images/${product.image2}`,
    `/images/${product.image3}`,
  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <>
      <div className="flex gap-3 flex-col">
        <div className="h-[350px] w-full]">
          <img
            src={`/images/${product.image1}`}
            onClick={() => openImageViewer(0)}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-[100px] w-full">
            <img
              src={`/images/${product.image2}`}
              onClick={() => openImageViewer(1)}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="h-[100px] w-full">
            <img
              src={`/images/${product.image3}`}
              onClick={() => openImageViewer(2)}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={arrayImage}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
};
