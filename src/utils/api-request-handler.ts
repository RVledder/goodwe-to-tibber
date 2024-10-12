import { z } from "zod";

type Params<ResponseType> = { url: string, method: 'GET' | 'POST', headers: HeadersInit, body: string, schema: z.ZodSchema<ResponseType> };

export class ApiRequestHandler {
  protected async makeAndRequestAndValidate<ResponseType>(
    { url, method, headers, body, schema }: Params<ResponseType>
  ): Promise<ResponseType | void> {
    try {
      const response = await fetch(url, { method, headers, body });

      const data = await response.json();
      const validation = schema.safeParse(data);

      if (!validation.success) {
        console.error('Response data is not according to schema: ', validation.error.format());
        console.log(data);
        return;
      }

      if (data.hasError) {
        console.error('Response error: ', data.msg);
      }

      return validation.data;
    } catch (error) {
      console.error('SEMS Error:', error);
    }
  }
}