import {z} from "zod";

export const crossLoginRequestBodySchema = z.object({
  account: z.string(),
  pwd: z.string(),
  isLocal: z.boolean(),
});

export type ApiCrossLoginRequestBody = z.infer<typeof crossLoginRequestBodySchema>;
