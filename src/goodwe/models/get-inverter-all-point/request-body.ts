import {z} from "zod";

export const getInverterAllPointRequestBodySchema = z.object({
  powerStationId: z.string(),
});

export type ApiGetInverterAllPointRequestBody = z.infer<typeof getInverterAllPointRequestBodySchema>;
