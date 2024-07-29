// FormField.tsx
import React from "react";

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
}) => (
  <div className="w-full flex flex-col gap-2">
    <label className="text-sm">{label}</label>
    {type === "textarea" ? (
      <textarea
        rows={3}
        className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none"
        placeholder={placeholder}
        name={name}
        value={value as string}
        onChange={onChange}
      />
    ) : (
      <input
        className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    )}
    {error && <span className="text-red-500">{error}</span>}
  </div>
);

export default FormField;
