import React from "react";

const Button = (props : any) => {
  const { children, variant } = props;
  return (
    <button className={`h-10 px-6 rounded-sm text-white ${variant}`} type="submit">
      {children}
    </button>
  );
};

export default Button;
