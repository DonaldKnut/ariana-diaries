import { z } from "zod";

export const inputsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be greater than 0"),
  catSlug: z.string().min(1, "Category is required"),
});

export const optionSchema = z.object({
  title: z.string().min(1, "Option title is required"),
  additionalPrice: z.number().min(0, "Additional price must be greater than 0"),
});

export type Inputs = z.infer<typeof inputsSchema>;
export type Option = z.infer<typeof optionSchema>;
export type Errors = Partial<Record<keyof Inputs, string>> & {
  image?: string;
};
