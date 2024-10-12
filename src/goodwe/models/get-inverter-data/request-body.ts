import {z} from 'zod';

export const getInverterDataRequestBodySchema = z.object({
  sn: z.string(),
});

export type ApiGetInverterDataRequestBody = z.infer<typeof getInverterDataRequestBodySchema>;
