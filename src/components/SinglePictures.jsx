/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const SinglePictures = ({
  src,
  id,
  index,
  moveImage,
  selected,
  toggleSelection,
  selectedImageCount,
  isFirstImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "image",
    hover(item) {
      if (item.index === index) {
        return;
      }
      moveImage(item.index, index);
      item.index = index;
    },
  });

  const opacity = isDragging ? 0.5 : 1;
  const transition = "all 0.3s ease-in-out";
  const boxShadow =
    isFirstImage && isDragging ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none";
  const transform = isDragging ? "scale(1.05)" : "none";

  return (
    <div
      className={`w-1/2 border rounded-lg hover:contrast-50 relative ${
        isFirstImage ? "col-span-2 row-span-2 w-full" : "w-full"
      }`}
      ref={(node) => drag(drop(node))}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity,
        transition,
        width: isFirstImage ? "100%" : "auto",
        height: isFirstImage ? "100%" : "auto",
        boxShadow,
        transform,
      }}
    >
      <label>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleSelection(id)}
          className={`checkbox checkbox-sm absolute ml-2 mt-2  checkbox-info ${
            isHovered
              ? "block"
              : "hidden" && selectedImageCount > 0
              ? "visible"
              : "invisible"
          }`}
        />
        <img className="" src={src} alt={`Image ${id}`} style={{ opacity }} />
      </label>
    </div>
  );
};

export default SinglePictures;
