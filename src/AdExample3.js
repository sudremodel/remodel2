import React, { useRef, useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import "./AdExample3.css";
import './fonts.css';

const AdExample3 = ({ formData }) => {
  const { logo, currentImageSrc: image, headline, subheadline, callToAction,textBackgroundColor, textColor } = formData;
  const adContainerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  // const imageRef = useRef(null);

  useEffect(() => {
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
    if (adContainerRef.current && imagesLoaded) {
      domtoimage.toBlob(adContainerRef.current)
        .then((blob) => {
          saveAs(blob, 'template.png');
        })
        .catch((error) => {
          console.error("Error capturing content:", error);
        });
    }
  };
  const styles = {
    fontFamily: "'CoreSansN65Bold', sans-serif",
  };

  return (
    <div style={styles}>
      <div className="ad-example-3" ref={adContainerRef}>
      <img className="primary-image-placeholder-1" alt="" src={image} />
        <div className="logo-group">
          <img className="logo-placeholder" alt="" src={logo} />
        </div>
        <div className="headline-parent3">
          <div className="text-container3">
            <div className="headline3">
              <div className="text-background" style={{ backgroundColor: textBackgroundColor, color: textColor }}>
                {headline}
              </div>
            </div>
            <div className="subheadline3">
              <div className="text-background" style={{ backgroundColor: textBackgroundColor, color: textColor }}>
                {subheadline}
              </div>
            </div>
            <div className="callToAction3">
              <div className="text-background" style={{ backgroundColor: textBackgroundColor, color: textColor }}>
                {callToAction}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleDownload}>Download Template</button>
    </div>
  );
};

export default AdExample3;
