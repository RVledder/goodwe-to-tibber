import 'dotenv/config';
import {envSchema} from "./models/env-schema";
import {GoodWeApi} from "./goodwe/api";

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1);
}

const GoodWe = new GoodWeApi({
  username: process.env.SEM_USERNAME!,
  password: process.env.SEM_PASSWORD!,
  stationID: process.env.SEM_STATION_ID!,
});

GoodWe.getLoginToken().then((response) => {
  if (response) {
    GoodWe.getInverterData({ token: response.data }).then(
      (data) => console.log('Inverter data: ', data)
    );
  }
});
