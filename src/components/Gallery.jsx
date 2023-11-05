import { useState } from "react";
import imageList from "./../data/images";
import SinglePictures from "./singlePictures";
import { BsImages } from "react-icons/bs";

const Gallery = () => {
  const [images, setImages] = useState(imageList);
  const [selectedImageCount, setSelectedImageCount] = useState(0);

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  const toggleSelection = (id) => {
    const updatedImages = images.map((image) => {
      if (image.id === id) {
        image.selected = !image.selected;
      }
      return image;
    });

    const count = updatedImages.filter((image) => image.selected).length;

    setImages(updatedImages);
    setSelectedImageCount(count);
  };

  const deleteSelectedImages = () => {
    const updatedImages = images.filter((image) => !image.selected);
    setImages(updatedImages);
    setSelectedImageCount(0);
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex justify-center items-center ">
      <div className="w-full rounded-lg lg:px-0 px-12">
        {/* Header Starts*/}
        <div className="flex justify-between lg:px-12 px-2 py-4 items-center  border border-b-gray-300 rounded ">
          <h2
            className={`lg:text-xl font-bold  ${
              selectedImageCount > 0 ? "hidden" : "visible"
            }`}
          >
            Gallery
          </h2>
          <div
            className={`flex text-lg gap-x-2 justify-center items-center  ${
              selectedImageCount > 0 ? "visible" : "invisible"
            }`}
          >
            <input
              type="checkbox"
              checked="checked"
              className="checkbox checkbox-sm checkbox-info "
            />
            <h2 className="font-bold lg:text-xl text-sm">
              {selectedImageCount} files Selected
            </h2>
          </div>

          <button
            className={`text-red-500 font-bold ${
              selectedImageCount > 0 ? "visible" : "invisible"
            }`}
            onClick={deleteSelectedImages}
          >
            Delete Files
          </button>
        </div>
        {/* Header Ends*/}

        {/* gallery Starts*/}
        <div className="grid lg:grid-cols-5 grid-cols-3  place-items-center gap-4 py-4">
          {images.map((image, index) => (
            <SinglePictures
              src={image.img}
              id={image.id}
              index={index}
              moveImage={moveImage}
              key={image.id}
              selected={image.selected}
              toggleSelection={toggleSelection}
              selectedImageCount={selectedImageCount}
              isFirstImage={index === 0}
            />
          ))}
          <div className="col-span-1 row-span-1 outline-dashed outline-gray-200 rounded flex flex-col justify-center items-center	w-full h-full">
            <BsImages />
            <h2 className="font-medium lg:text-lg text-xs">Add Images</h2>
          </div>
        </div>
        {/* gallery Ends*/}
      </div>
    </div>
  );
};

export default Gallery;
