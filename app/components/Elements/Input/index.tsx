import React from "react";
import Input from "./input";
import Label from "./Label";

const InputForm = ({ props }: any) => {
  const { Label, name, Input, type, placeholder } = props;
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{Label}</Label>
      <Input type={type} name={name} placeholder={placeholder} />
    </div>
  );
};

export default InputForm;
