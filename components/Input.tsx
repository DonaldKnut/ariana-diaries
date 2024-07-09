import React, { ChangeEvent } from "react";

interface InputProps {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  name,
  label,
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full bg-[#29250965] p-3 rounded-lg"
      />
    </div>
  );
};

export default Input;
