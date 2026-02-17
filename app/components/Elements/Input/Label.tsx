import React from "react";

const Label = ({ props }: any) => {
  const { children, htmlFor } = props;
  return (
    <label htmlFor={htmlFor} className="text-slate-500 text-xl font-semibold">
      {children}
    </label>
  );
};

export default Label;
