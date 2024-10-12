import {z} from "zod";

export const getInverterDataAllRequestBodySchema = z.object({
  powerStationId: z.string(),
});

export type ApiGetInverterDataAllRequestBody = z.infer<typeof getInverterDataAllRequestBodySchema>;
