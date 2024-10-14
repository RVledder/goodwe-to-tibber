import {z} from "zod";

export const commonPropertiesSchema = z.object({
  language: z.string().nullable().optional(),
  function: z.string().nullable().optional(),
  hasError: z.boolean(),
  msg: z.string(),
  code: z.union([z.number(), z.string()]),
});
