import {z} from "zod";
import {componentsSchema} from "../shared/components-schema";
import {commonPropertiesSchema} from "../shared/common-response-properties";

const inverterPointSchema = z.object({
  sn: z.string(),
  dict: z.object({
    left: z.array(z.object({
      isHT: z.boolean(),
      isStoreSkip: z.boolean(),
      key: z.string(),
      value: z.string(),
      unit: z.string(),
      isFaultMsg: z.number(),
      faultMsgCode: z.number()
    })),
    right: z.array(z.object({
      isHT: z.boolean(),
      isStoreSkip: z.boolean(),
      key: z.string(),
      value: z.string(),
      unit: z.string(),
      isFaultMsg: z.number(),
      faultMsgCode: z.number()
    }))
  }),
  points: z.array(z.object({
    target_index: z.number(),
    target_name: z.string(),
    display: z.string(),
    unit: z.string(),
    target_key: z.string(),
    text_cn: z.string(),
    target_sn_six: z.any().nullable(),
    target_sn_seven: z.any().nullable(),
    target_type: z.any().nullable(),
    storage_name: z.any().nullable()
  })),
  is_stored: z.boolean(),
  name: z.string(),
  in_pac: z.number(),
  out_pac: z.number(),
  eday: z.number(),
  emonth: z.number(),
  etotal: z.number(),
  status: z.number(),
  soc: z.string(),
  hTotal: z.number(),
  last_refresh_time: z.string(),
  vbattery1: z.number(),
  ibattery1: z.number(),
  master: z.number(),
  is_showOutput: z.boolean(),
  local_date: z.string(),
  gridConnStatus: z.string()
});

const dataSchema = z.object({
  count: z.number(),
  inverterPoints: z.array(inverterPointSchema)
});

export const getInverterAllPointResponseSchema = z.object({
  ...commonPropertiesSchema.shape,
  data: dataSchema.nullable(),
  components: componentsSchema,
});

export type GetInverterAllPointResponseType = z.infer<typeof getInverterAllPointResponseSchema>;
