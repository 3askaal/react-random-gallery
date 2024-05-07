import { useEffect, useState } from "react";
import { SGalleryItem, SGalleryItemImage } from "./Gallery.styled";
import { TImage, TOptions } from "../types";
import { formatSrcSet } from "../helpers";

type GalleryItemProps = {
  image: TImage;
  onPreviewImage: () => void;
  selected: boolean;
  options: TOptions;
}

export const GalleryItem = ({ image, onPreviewImage, selected, options }: GalleryItemProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.addEventListener('load', () => setLoaded(true));
    img.srcset = formatSrcSet(image.srcSet);
    img.src = image.src;
  }, [image.srcSet, image.src]);

  return loaded && (
    <SGalleryItem
      style={{
        width: image.style.width,
        height: image.style.height
      }}
      animation={{
        ...options.animation,
        style: {
          top: image.style.top,
          left: image.style.left,
          transform: image.style.transform,
        },
      }}
      onClick={onPreviewImage}
      selected={selected}
    >
      <picture>
        { image.formats?.map((format) => (
          <source
            srcSet={formatSrcSet(format.srcSet)}
            media={`(min-width: ${format.size})`}
          />
        )) }
        <SGalleryItemImage
          src={image.src}
          srcSet={formatSrcSet(image.srcSet)}
          alt={image.alt}
          selected={selected}
        />
      </picture>
    </SGalleryItem>
  )
}