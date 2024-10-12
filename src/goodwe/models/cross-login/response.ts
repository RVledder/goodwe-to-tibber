import { z } from 'zod';
import {componentsSchema} from "../shared/components-schema";

const dataSchema = z.object({
  uid: z.string().uuid(),
  timestamp: z.number(),
  token: z.string(),
  client: z.string(),
  version: z.string(),
  language: z.string(),
});

export const loginResponseSchema = z.object({
  hasError: z.boolean(),
  code: z.number(),
  msg: z.string(),
  data: dataSchema,
  components: componentsSchema,
  api: z.string().url(),
});

export type LoginResponseType = z.infer<typeof loginResponseSchema>;
