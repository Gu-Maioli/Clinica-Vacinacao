import React from "react";

function MsgRequired(props) {
  console.log("msg: " + props);
  return (
    <>
      <label for={props.id}>
        {props.obrigatorio && <span style={{ color: "salmon" }}>*</span>}
        {props.texto}
      </label>
    </>
  );
}

export default MsgRequired;
