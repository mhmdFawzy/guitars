import React from "react";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import imageRender from "./../../utils/imageRender";
function ProductImages(props) {
  return (
    <SimpleReactLightbox>
      {/* // This will be your content with the images. It can be anything.
          Content defined by yourself, content fetched from an API, data from a
          graphQL query... anything :) */}
      {props.images.length > 0 && (
        <SRLWrapper>
          {props.images.map((image, i) => {
            if (i === 0) {
              return (
                <div
                  className="product_image_container"
                  style={{ maxWidth: "100%" }}
                  key={i}
                >
                  <a href={image.url} className="main_pic" data-attribute="SRL">
                    <img
                      src={image.url}
                      alt=""
                      style={{ maxWidth: "100%", height: "60vh" }}
                    />
                  </a>
                </div>
              );
            } else {
              return (
                <div className="product_image_container" key={i}>
                  <a href={image.url} className="main_pic" data-attribute="SRL">
                    <img
                      src={image.url}
                      alt=""
                      style={{ maxWidth: "50%", height: "20vh" }}
                    />
                  </a>
                </div>
              );
            }
          })}
        </SRLWrapper>
      )}
      {props.images.length === 0 && (
        <div className="product_image_container">
          <img
            src="/images/image_not_availble.png"
            alt=""
            style={{ maxWidth: "100%", height: "60vh" }}
          />
        </div>
      )}
    </SimpleReactLightbox>
  );
}

export default ProductImages;
