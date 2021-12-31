import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
export default function ProductSlider() {
  const slideImages = [
    {
      image:
        "https://images.pexels.com/photos/5704410/pexels-photo-5704410.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      title: "Sport",
    },
    {
      image:
        "https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      title: "Education",
    },
    {
      image:
        "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      title: "Music",
    },
  ];

  return (
    <div style={{marginTop:"-10px"}}>
      <Slide arrows={false} style={{ height: "600px" }}>
        {slideImages.map((obj, index) => {
          return (
            <div
              key={obj.index}
              className="each-slide"
              style={{ height: "600px" }}
              
            >
              <div
                style={{
                  backgroundImage: `url(${obj.image})`,
                  height: "600px",
                }}
              >
                {/* <span>{obj.title}</span> */}
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}
