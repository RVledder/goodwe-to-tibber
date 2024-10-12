import {z} from "zod";

export const tokenSchema = z.object({
  uid: z.string(),
  timestamp: z.number(),
  token: z.string(),
  client: z.string(),
  version: z.string(),
  language: z.string(),
});

export type Token = z.infer<typeof tokenSchema>;