import { z } from 'zod';

const getStatisticsChartsSchema = z.object({
  end: z.string(), // DD/MM/YYYY
  ids: z.string(),
  range: z.number(),
  start: z.string(), // DD/MM/YYYY
  type: z.number(), // 3 = month, 4 = year
});

export type GetStatisticsChartsType = z.infer<typeof getStatisticsChartsSchema>;
