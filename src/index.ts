import 'dotenv/config';
import {envSchema} from "./models/env-schema";
import {GoodWeApi} from "./goodwe/api";
import {DebugTools} from "./utils/debug-tools";

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

const debugTools = new DebugTools();

init().catch(error => {
  console.error('Error in main execution:', error);
});

async function init() {
  const loginResponse = await GoodWe.getLoginToken();
  if (!loginResponse) return;

  console.log('=== SEM login successful');

  const token = loginResponse.data;
  const inverterAllPointDataResponse = await GoodWe.getInverterAllPointData({ token });
  if (!inverterAllPointDataResponse) return;

  console.log('=== SEM GetInverterAllPoint successful');

  debugTools.saveDataToFile(inverterAllPointDataResponse, 'goodwe-inverter-all-point-data.json');

  const serialNumber = inverterAllPointDataResponse.data?.inverterPoints[0]?.sn;
  if (!serialNumber) return;

  const inverterData = await GoodWe.GetInverterData({ token, serialNumber });
  if (!inverterData) return;

  console.log('=== SEM GetInverterData successful');

  // The data object from the GetInverterData response is a stringified JSON object,
  // therefore it's parsed here to make it easier to work with.
  const parsedData = {
    ...inverterData,
    data: JSON.parse(inverterData.data),
  };

  debugTools.saveDataToFile(parsedData, 'goodwe-inverter-data.json');
}
