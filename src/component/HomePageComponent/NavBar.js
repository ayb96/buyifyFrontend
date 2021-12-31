import React from "react";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="navibar-com">
      <div className="nav-leftbox"></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ height: "30px" }}></div>
        <div className="navvv-constainerz">
          <div className="nav-home" onClick={() => navigate(`/`)}>
            Home
          </div>
          <div className="nav-About" onClick={() => navigate(`#about`)}>
            
            About us
          </div>
          <div className="nav-Contact" onClick={() => navigate(`/`)}>
            Contact us
          </div>
        </div>
      </div>

      <div className="nav-rightbox"></div>
    </div>
  );
}
