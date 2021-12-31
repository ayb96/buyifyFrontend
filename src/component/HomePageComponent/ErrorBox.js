import React from "react";

export default function ErrorBox(props) {
  return (
    <div >
      <div className={`alert alert-${props.variant || "info"}`} style={{margin:"5px"}}>
        {props.children}
      </div>
    </div>
  );
}
