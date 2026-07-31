import { useState } from "react";
import capImg from "../../../../assets/productdetail/cap.jpg";
import cap1Img from "../../../../assets/productdetail/cap1.jpg";
import cappImg from "../../../../assets/productdetail/capp.jpg";

const images = [capImg, cap1Img, cappImg];

export default function ProductGallery() {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div
      className="
        rounded-[20px]
        border
        border-[#E7E8E9]
        bg-white
        p-5
      "
    >
      {/* Main Image */}
      <div
        className="
          flex
          h-[250px] sm:h-[360px]
          items-center
          justify-center
          rounded-xl
          bg-[#F3F4F3]
        "
      >
        <img
          src={activeImage}
          alt="Product"
          className="
            h-full
            w-full
            rounded-xl
            object-cover
          "
        />
      </div>

      {/* Thumbnails */}
      <div
        className="
          mt-4
          flex
          gap-3
        "
      >
        {images.map((image) => (
          <button
            key={image}
            onClick={() => setActiveImage(image)}
            className={`
              h-16
              w-16
              overflow-hidden
              rounded-lg
              border-2
              ${
                activeImage === image
                  ? "border-[#00351B]"
                  : "border-[#E7E8E9]"
              }
            `}
          >
            <img
              src={image}
              alt=""
              className="
                h-full
                w-full
                object-cover
              "
            />
          </button>
        ))}
      </div>
    </div>
  );
}