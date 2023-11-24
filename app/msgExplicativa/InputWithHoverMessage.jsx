import React, { useState } from "react";

const InputWithHoverMessage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <label htmlFor="myInput">Digite algo:</label>
      <input
        id="myInput"
        type="text"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isHovered && <p>Mensagem ao passar o mouse sobre o input.</p>}
    </div>
  );
};

export default InputWithHoverMessage;
