import React from "react";

const Input = ({ props }: any) => {
  const { type, name, placeholder } = props;
  return <input type={type} className="bg-white w-full py-2.5 px-4 rounded-sm text-slate-500 opacity-50" 
  name={name} placeholder={placeholder} />;
};

export default Input;
