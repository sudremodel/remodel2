import React, { useRef, useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const AdTemplate = ({ formData, styles }) => {
    const adContainerRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
  
    useEffect(() => {
      if (!formData) {
        return;
      }
  
      const images = adContainerRef.current.querySelectorAll("img");
  
      const waitForImages = Array.from(images).map((img) => {
        return new Promise((resolve) => {
          img.onload = resolve;
        });
      });
  
      Promise.all(waitForImages).then(() => {
        setImagesLoaded(true);
      });
    }, [formData]);
  
    const handleDownload = () => {
      if (!formData || !adContainerRef.current || !imagesLoaded) {
        return;
      }
  
      domtoimage.toBlob(adContainerRef.current)
        .then((blob) => {
          saveAs(blob, 'template.png');
        })
        .catch((error) => {
          console.error("Error capturing content:", error);
        });
    };
  
    if (!formData) {
      return <div>Loading...</div>; // or any other placeholder content
    }
  
    const { logo, currentImageSrc: image, headline, subheadline, textBackgroundColor, textColor } = formData;
  
    return (
      <div>
        <div className="ad-example" ref={adContainerRef} style={styles.container}>
          {/* rest of the component */}
        </div>
        <button onClick={handleDownload}>Download Template</button>
      </div>
    );
  };
  
export default AdTemplate;
