import {z} from "zod";
import {componentsSchema} from "../shared/components-schema";

const dataSchema = z.any();

export const getPlantPowerChartResponseSchema = z.object({
  language: z.string().nullable().optional(),
  function: z.string().nullable().optional(),
  hasError: z.boolean(),
  msg: z.string(),
  data: dataSchema,
  code: z.union([z.number(), z.string()]),
  components: componentsSchema,
});

export type GetPlantPowerChartResponseType = z.infer<typeof getPlantPowerChartResponseSchema>;
