import { z } from "zod";
import { inputsSchema, Inputs, Errors } from "./zodSchemas";

export const validateInputs = (
  inputs: Inputs,
  image: string
): Errors | null => {
  try {
    inputsSchema.parse(inputs);
    if (!image) {
      return { image: "Image is required" };
    }
    return null;
  } catch (e) {
    const zodErrors = e as z.ZodError<Inputs>;
    const newErrors: Errors = {};
    zodErrors.errors.forEach((err) => {
      newErrors[err.path[0] as keyof Inputs] = err.message;
    });
    if (!image) {
      newErrors.image = "Image is required";
    }
    return newErrors;
  }
};
