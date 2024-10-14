import {z} from "zod";
import {commonPropertiesSchema} from "../shared/common-response-properties";
import {componentsSchema} from "../shared/components-schema";

const col = z.object({
  index: z.number(),
  label: z.string(),
  rowName: z.string(),
  width: z.number(),
  formatter: z.unknown(),
  seletele: z.unknown(),
});

const row = z.object({
  plant: z.string(),
  classification: z.string(),
  contributionRatio: z.number(),
  date: z.string(),
  date_string: z.unknown(),
  feedinPrice: z.number(),
  electricalTariff: z.number(),
  capacity: z.number(),
  generation: z.number(),
  yield: z.number(),
  sell: z.number(),
  buy: z.number(),
  etotalLoad: z.number(),
  selfUseRatio: z.number(),
  selfUseOfPv: z.number(),
  load: z.number(),
  hasLt4: z.boolean(),
  mockData: z.number(),
  radiationDose: z.number(),
  gensetGen: z.number(),
});

const dataSchema = z.object({
  title: z.string(),
  page: z.object({
    pageIndex: z.number(),
    pageSize: z.number(),
    records: z.number(),
    sidx: z.unknown(),
    sord: z.unknown(),
    totalPage: z.number(),
  }),
  cols: z.array(col),
  rows: z.array(row),
});

export const getStatisticsDataResponseSchema = z.object({
  ...commonPropertiesSchema.shape,
  data: dataSchema,
  components: componentsSchema,
});

export type GetStatisticsDataResponseType = z.infer<typeof getStatisticsDataResponseSchema>;
