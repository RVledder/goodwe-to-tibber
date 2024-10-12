import {z} from "zod";
import {componentsSchema} from "../shared/components-schema";

export const getInverterAllDataResponseSchema = z.object({
  language: z.string().nullable().optional(),
  function: z.string().nullable().optional(),
  hasError: z.boolean(),
  msg: z.string(),
  data: z.any().nullable(),
  code: z.union([z.number(), z.string()]),
  components: componentsSchema,
});

export type GetInverterAllDataResponseType = z.infer<typeof getInverterAllDataResponseSchema>;
