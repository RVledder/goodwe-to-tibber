import {ApiRequestHandler} from "../utils/api-request-handler";
import {ApiCrossLoginRequestBody} from "./models/cross-login/request-body";
import {loginResponseSchema, LoginResponseType} from "./models/cross-login/response";
import {ApiGetInverterAllPointRequestBody} from "./models/get-inverter-all-point/request-body";
import {getInverterAllPointResponseSchema, GetInverterAllPointResponseType} from "./models/get-inverter-all-point/response";
import {Token} from "./models/shared/token-schema";
import {ApiGetInverterDataRequestBody} from "./models/get-inverter-data/request-body";
import {getInverterDataResponseSchema, GetInverterDataResponseType} from "./models/get-inverter-data/response";
import {GetPlantPowerChartType} from "./models/get-plant-power-chart/request-body";
import {
  getPlantPowerChartResponseSchema,
  GetPlantPowerChartResponseType
} from "./models/get-plant-power-chart/response";
import {GetStatisticsChartsType} from "./models/get-statistics-charts/request-body";
import {GetStatisticsDataType} from "./models/get-statistics-data/request-body";
import {
  getStatisticsChartsResponseSchema,
  GetStatisticsChartsResponseType
} from "./models/get-statistics-charts/response";
import {getStatisticsDataResponseSchema, GetStatisticsDataResponseType} from "./models/get-statistics-data/response";

export class GoodWeApi extends ApiRequestHandler {
  private readonly username: string;
  private readonly password: string;
  private readonly stationID: string;
  private readonly apiBaseUrl = 'https://www.semsportal.com/api';

  constructor({
    username,
    password,
    stationID,
  }: {
    username: string,
    password: string,
    stationID: string,
  }) {
    super();

    this.username = username;
    this.password = password;
    this.stationID = stationID;
  }

  private readonly endPoints = {
    login: '/v3/Common/CrossLogin',
    getInverterAllPoint: '/v3/PowerStation/GetInverterAllPoint',
    getInverterData: '/v3/Inverter/GetInverterData',
    getPlantPowerChart: '/v2/Charts/GetPlantPowerChart',
    getStatisticsCharts: '/v1/Statistics/GetStatisticsCharts',
    getStatisticsData: '/v1/Statistics/GetStatisticsData',
  }

  /**
   * This is the first step to authenticate with the SEMS API.
   */
  async getLoginToken(): Promise<LoginResponseType | void> {
    try {
      const url = this.apiBaseUrl + this.endPoints.login;

      const emptyToken = {
        "uid": "",
        "timestamp": 0,
        "token": "",
        "client": "web",
        "version": "",
        "language": "nl-nl"
      };

      const headers = {
        'Content-Type': 'application/json',
        'Token': btoa(JSON.stringify(emptyToken)),
      };

      const body: ApiCrossLoginRequestBody = {
        account: this.username,
        pwd: this.password,
        isLocal: false,
      };

      return this.makeAndRequestAndValidate({
        url,
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        schema: loginResponseSchema,
      });
    } catch (error) {
      console.error('SEMS authentication error:', error);
    }
  }

  /**
   * This can be used to continuously get the latest data.
   * Use the data.pac property for the current power output.
   *
   * Preferable over getInverterData, because you don't need a serial number for this 'all' end point.
   */
  async getInverterAllPointData({ token }: {token: Token}): Promise<GetInverterAllPointResponseType | void> {
    try {
      const headers = {
        'Token': btoa(JSON.stringify(token)),
        'Content-Type': 'application/json',
      };

      const body: ApiGetInverterAllPointRequestBody = {
        powerStationId: this.stationID,
      };

      const url = this.apiBaseUrl + this.endPoints.getInverterAllPoint;

      return this.makeAndRequestAndValidate<GetInverterAllPointResponseType>({
        url,
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        schema: getInverterAllPointResponseSchema,
      });
    } catch(error) {
      console.error('SEMS GetInverterAllPointData Error:', error);
    }
  }

  async getInverterData({ token, serialNumber }: {token: Token; serialNumber: string}): Promise<GetInverterDataResponseType | void> {
    try {
      const headers = {
        'Token': btoa(JSON.stringify(token)),
        'Content-Type': 'application/json',
      };

      const body: ApiGetInverterDataRequestBody = {
        sn: serialNumber,
      };

      const url = this.apiBaseUrl + this.endPoints.getInverterData;

      return this.makeAndRequestAndValidate({
        url,
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        schema: getInverterDataResponseSchema,
      });
    } catch(error) {
      console.error('SEMS GetInvertedData Error:', error);
    }
  }

  /**
   * This can be used to get the power plant output for a specific date.
   */
  async getPlantPowerChart({ token, date }: {token: Token; date: string}): Promise<GetPlantPowerChartResponseType | void> {
    try {
      const headers = {
        'Token': btoa(JSON.stringify(token)),
        'Content-Type': 'application/json',
      };

      const body: GetPlantPowerChartType = {
        date: date,
        full_script: false,
        id: this.stationID,
      };

      const url = this.apiBaseUrl + this.endPoints.getPlantPowerChart;

      return this.makeAndRequestAndValidate<GetPlantPowerChartResponseType>({
        url,
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        schema: getPlantPowerChartResponseSchema,
      });
    } catch(error) {
      console.error('SEMS GetPlantPowerChart Error:', error);
    }
  }

  async getStatisticsCharts({token, requestBody }: { token: Token, requestBody: GetStatisticsChartsType }): Promise<GetStatisticsChartsResponseType | void> {
    try {
      const headers = {
        'Token': btoa(JSON.stringify(token)),
        'Content-Type': 'application/json',
      };

      const url = this.apiBaseUrl + this.endPoints.getStatisticsCharts;

      return this.makeAndRequestAndValidate<GetStatisticsChartsResponseType>({
        url,
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        schema: getStatisticsChartsResponseSchema,
      });
    } catch(error) {
      console.error('SEMS Any Error:', error);
    }
  }

  async getStatisticsData({token, requestBody}: { token: Token, requestBody: GetStatisticsDataType }): Promise<GetStatisticsDataResponseType | void> {
    try {
      const headers = {
        'Token': btoa(JSON.stringify(token)),
        'Content-Type': 'application/json',
      };

      const url = this.apiBaseUrl + this.endPoints.getStatisticsData;

      return this.makeAndRequestAndValidate<GetStatisticsDataResponseType>({
        url,
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        schema: getStatisticsDataResponseSchema,
      });
    } catch(error) {
      console.error('SEMS Any Error:', error);
    }
  }
}
