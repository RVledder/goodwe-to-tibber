import {z} from "zod";
import {componentsSchema} from "../shared/components-schema";
import {commonPropertiesSchema} from "../shared/common-response-properties";

const dataSchema = z.array(
  z.object({
    yield: z.array(z.any()),
    income: z.array(z.any()),
    gensetGen: z.nullable(z.unknown()),
    threshold: z.array(z.unknown()),
    label: z.string(),
    mockLabel: z.nullable(z.unknown()),
    yieldUnit: z.string(),
    currencyUnit: z.string(),
    gensetGenUnit: z.nullable(z.unknown()),
  })
);

export const getStatisticsChartsResponseSchema = z.object({
  ...commonPropertiesSchema.shape,
  data: dataSchema,
  components: componentsSchema,
});

export type GetStatisticsChartsResponseType = z.infer<typeof getStatisticsChartsResponseSchema>;
