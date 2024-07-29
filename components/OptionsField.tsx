// OptionsField.tsx
import React from "react";
import { optionSchema, Option } from "../lib/zodSchemas";

interface OptionsFieldProps {
  option: Option;
  options: Option[];
  setOption: React.Dispatch<React.SetStateAction<Option>>;
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}

const OptionsField: React.FC<OptionsFieldProps> = ({
  option,
  options,
  setOption,
  setOptions,
}) => {
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOption((prev) => ({
      ...prev,
      [name]: name === "additionalPrice" ? parseFloat(value) : value,
    }));
  };

  const addOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      optionSchema.parse(option);
      setOptions((prev) => [...prev, option]);
      setOption({ title: "", additionalPrice: 0 });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm">Options</label>
      <div className="flex flex-wrap gap-2">
        <input
          className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none flex-grow"
          type="text"
          placeholder="Title"
          name="title"
          value={option.title}
          onChange={changeOption}
        />
        <input
          className="ring-1 ring-[#cdbb63] p-2 sm:p-4 rounded-sm placeholder:text-gold outline-none flex-grow"
          type="number"
          placeholder="Additional Price"
          name="additionalPrice"
          value={option.additionalPrice}
          onChange={changeOption}
        />
        <button
          className="bg-[#766d46] flex items-center justify-center hover:bg-[#6c661b] p-2 text-white rounded-sm"
          onClick={addOption}
        >
          Add Option
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((opt) => (
          <div
            key={opt.title}
            className="p-2 rounded-md cursor-pointer bg-[#796d2f] text-gold"
            onClick={() =>
              setOptions((prev) =>
                prev.filter((item) => item.title !== opt.title)
              )
            }
          >
            <span>{opt.title}</span>
            <span className="text-xs"> (+ ${opt.additionalPrice})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsField;
