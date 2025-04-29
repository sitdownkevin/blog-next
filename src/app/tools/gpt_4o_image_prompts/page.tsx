"use client"

import Masonry from 'react-masonry-css'; // Import Masonry
import { Box } from "@/components/tools/gpt_4o_image_prompts/Box"; // Import Box component
import { imageData } from "@/lib/tools/gpt_4o_image_prompts/data"; // Import image data


// Define breakpoint columns for Masonry layout
const breakpointColumnsObj = {
  default: 3, // Default to 3 columns
  1100: 2,    // 2 columns for screens >= 1100px
  700: 1      // 1 column for screens >= 700px
};

export default function Page() {

    // Data is now imported from src/lib/tools/gpt_4o_image_prompts/data.ts


  return (
    <div className="p-4"> {/* Remove flex-wrap */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {imageData.map((item, index) => ( // Use imported imageData
            <Box key={index} {...item} />
        ))}
      </Masonry>
      {/* Add Masonry CSS styles */}
      <style jsx global>{`
        .masonry-grid {
          display: flex;
          margin-left: -16px; /* gutter size offset */
          width: auto;
        }
        .masonry-grid_column {
          padding-left: 16px; /* gutter size */
          background-clip: padding-box;
        }

        /* Style your items */
        .masonry-grid_column > div { /* Apply to the direct children of the column */
          margin-bottom: 16px; /* space between items */
        }
      `}</style>
    </div>
  );
}