import {z} from "zod";

export const componentsSchema = z.object({
  para: z.string().nullable(),
  langVer: z.number(),
  timeSpan: z.number(),
  api: z.string().url().nullable(),
  msgSocketAdr: z.union([z.string().url(), z.string().length(0), z.null()]),
});