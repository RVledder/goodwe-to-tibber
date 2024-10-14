import {z} from "zod";
import {componentsSchema} from "../shared/components-schema";
import {commonPropertiesSchema} from "../shared/common-response-properties";

const dataSchema = z.any();

export const getInverterDataResponseSchema = z.object({
  ...commonPropertiesSchema.shape,
  data: dataSchema,
  components: componentsSchema,
});

export type GetInverterDataResponseType = z.infer<typeof getInverterDataResponseSchema>;
