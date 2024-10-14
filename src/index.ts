import 'dotenv/config';
import {envSchema} from "./models/env-schema";
import {GoodWeApi} from "./goodwe/api";
import {DebugTools} from "./utils/debug-tools";
import {GetStatisticsChartsType} from "./goodwe/models/get-statistics-charts/request-body";
import {Token} from "./goodwe/models/shared/token-schema";

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

  const serialNumber = await fetchAndSaveInverterAllData(token);
  if (serialNumber) {
    await fetchAndSaveInverterData(token, serialNumber);
  }

  await fetchAndSavePowerPlantChartData(token);
  await fetchAndSaveStatisticsCharts(token);
  await fetchAndSaveStatisticsData(token);
}

const fetchAndSaveInverterAllData = async (token: Token) => {
  const inverterAllPointDataResponse = await GoodWe.getInverterAllPointData({ token });
  if (!inverterAllPointDataResponse) return;

  console.log('=== SEM GetInverterAllPoint successful');

  debugTools.saveDataToFile(inverterAllPointDataResponse, 'goodwe-inverter-all-point-data.json');

  return inverterAllPointDataResponse.data?.inverterPoints[0]?.sn;
}

const fetchAndSaveInverterData = async (token: Token, serialNumber: string) => {
  const inverterData = await GoodWe.getInverterData({ token, serialNumber });
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

const fetchAndSavePowerPlantChartData = async (token: Token) => {
  const date = "2024-10-10";
  const getPlantPowerChartData = await GoodWe.getPlantPowerChart({ token, date });
  if (!getPlantPowerChartData) return;

  console.log('=== SEM GetPlantPowerChart successful');

  debugTools.saveDataToFile(getPlantPowerChartData, 'goodwe-plant-power-chart-data.json');
}

const fetchAndSaveStatisticsCharts = async (token: Token) => {

  const bodyMonth: GetStatisticsChartsType = {
    end: "",
    ids: "72d2ff29-c432-496d-8643-1c34ffe697ce",
    range: 1,
    start: "09/01/2024",
    type: 3
  };

  // year
  // const bodyYear: GetStatisticsChartsType = {
  //   end: "",
  //   ids: "72d2ff29-c432-496d-8643-1c34ffe697ce",
  //   range: 1,
  //   start: "01/01/2024",
  //   type: 4,
  // };

  const statisticsCharts = await GoodWe.getStatisticsCharts({ token, requestBody: bodyMonth });
  if (!statisticsCharts) return;

  console.log('=== SEM GetStatisticsCharts successful');

  debugTools.saveDataToFile(statisticsCharts, 'goodwe-get-statistics-charts.json');
};

const fetchAndSaveStatisticsData = async (token: Token) => {

  // month
  // const body = {
  //   end: "",
  //   ids: "72d2ff29-c432-496d-8643-1c34ffe697ce",
  //   pageIndex: 1,
  //   pageSize: 10,
  //   range: 1,
  //   start: "09/01/2024",
  //   type: 3
  // };

  const bodyYear = {
    end: "",
    ids: "72d2ff29-c432-496d-8643-1c34ffe697ce",
    pageIndex: 1,
    pageSize: 10,
    range: 1,
    start: "01/01/2024",
    type: 4
  };

  const statisticsData = await GoodWe.getStatisticsData({ token, requestBody: bodyYear });
  if (!statisticsData) return;

  console.log('=== SEM GetStatisticsData successful');

  debugTools.saveDataToFile(statisticsData, 'goodwe-get-statistics-data-table.json');
}
