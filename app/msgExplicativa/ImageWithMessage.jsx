import React from "react";
import Image from "next/image";
import "../msgExplicativa/ImageWithMessage.css";

function ImageWithMessage(props) {
  return (
    <div className="image-container">
      <Image src="/assets/img/question.png" width={50} height={50} alt="Logo" />
      <div className="message success">{props.msg}</div>
    </div>
  );
}

export default ImageWithMessage;
