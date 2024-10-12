import { z } from 'zod';

export const envSchema = z.object({
  SEM_USERNAME: z.string().email(),
  SEM_PASSWORD: z.string(),
  SEM_STATION_ID: z.string(),
});
