import {z} from "zod";
import {componentsSchema} from "../shared/components-schema";
import {commonPropertiesSchema} from "../shared/common-response-properties";

const dataSchema = z.any();

export const getPlantPowerChartResponseSchema = z.object({
  ...commonPropertiesSchema.shape,
  data: dataSchema,
  components: componentsSchema,
});

export type GetPlantPowerChartResponseType = z.infer<typeof getPlantPowerChartResponseSchema>;
