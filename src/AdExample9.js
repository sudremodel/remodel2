import React, { useRef, useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import "./AdExample9.css";
import { saveAs } from "file-saver";
import html2canvas from 'html2canvas';
import './fonts.css';


const AdExample9 = ({ formData }) => {
  const { logo, currentImageSrc: image, headline, subheadline, callToAction, textBackgroundColor, textColor } = formData;
  console.log('Data received from child:', formData);
  const adContainerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

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

  const styles = {
    fontFamily: "'CoreSansN65Bold', sans-serif",
  };
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

  return (
    <div style={styles}>
      <div className="ad-example-9" ref={adContainerRef}>
        <img className="primary-image-placeholder-1" alt="" src={image} />
        <div className="logo-group">
          <img className="logo-placeholder-1" alt="" src={logo} />
        </div>
        <div className="headline-parent">
          <div className="text-container">
            <div className="headline">
              <div className="text-background" style={{ backgroundColor: textBackgroundColor, color: textColor }}>
                {headline}
              </div>
            </div>
            <div className="punchline">
              <div className="text-background" style={{ backgroundColor: textBackgroundColor, color: textColor }}>
                {subheadline}
              </div>
            </div>
            <div className="callToAction">
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

export default AdExample9;