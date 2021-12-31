import React from "react";
import { Link } from "react-router-dom";
export default function ProductCategory() {
  return (
    <div className="product-category">
      <div>
        <Link to="/category?search=Pants">
          <div className="category-title">
            Pants
          </div>
          <img
            src="https://s.yimg.com/ny/api/res/1.2/6DKHDMGUojxxggQgUFfaoQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2NA--/https://s.yimg.com/os/creatr-uploaded-images/2021-12/e1bd4e00-56d7-11ec-bf3f-dfd0a1ebef18"
            alt="Pants"
          />
        </Link>
      </div>
      <div>
        <Link to="/category?search=shirts">
          <div className="category-title">
            Shirts
          </div>
          <img
            src="https://pyxis.nymag.com/v1/imgs/cb5/ba1/396e96ea822753b18ec26854325d31efe6-aacp-white-tshirts.2x.rsocial.w600.jpg"
            alt="T-Shirts"
          />
        </Link>
      </div>
      <div>
        <Link to="/category?search=shoes">
          <div className="category-title">
            Shoes
          </div>
          <img
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/run-mens-running-shoes-1620332534.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
            alt="Shoes"
          />
        </Link>
      </div>
    </div>
  );
}
