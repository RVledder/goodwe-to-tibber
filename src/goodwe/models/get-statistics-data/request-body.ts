import {z} from "zod";

const getStatisticsDataSchema = z.object({
  end: z.string(), // DD/MM/YYYY
  ids: z.string(),
  range: z.number(),
  start: z.string(), // DD/MM/YYYY
  type: z.number(), // 3 = month, 4 = year
});

export type GetStatisticsDataType = z.infer<typeof getStatisticsDataSchema>;
