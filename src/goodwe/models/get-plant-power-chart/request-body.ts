import { z } from 'zod';

const getPlantPowerChartSchema = z.object({
  date: z.string(),
  full_script: z.boolean(),
  id: z.string(),
});

export type GetPlantPowerChartType = z.infer<typeof getPlantPowerChartSchema>;
