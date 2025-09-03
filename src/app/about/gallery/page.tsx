"use client"

import Masonry from 'react-masonry-css';
import Image from 'next/image';

const photos = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  src: `/assets/images/photos/g${index + 1}.webp`,
  caption: ''
}));

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
}

export default function Page() {

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">Gallery</h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="mb-4 transform transition duration-300 hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden"
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              width={1000}
              height={1000}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </Masonry>
      <style jsx global>{`
        .masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .masonry-grid_column {
          padding-left: 16px;
          background-clip: padding-box;
        }
      `}</style>
    </div>
  )
}