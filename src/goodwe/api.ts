import {ApiRequestHandler} from "../utils/api-request-handler";
import {ApiCrossLoginRequestBody} from "./models/cross-login/request-body";
import {loginResponseSchema, LoginResponseType} from "./models/cross-login/response";
import {ApiGetInverterAllPointRequestBody} from "./models/get-inverter-all-point/request-body";
import {getInverterAllPointResponseSchema, GetInverterAllPointResponseType} from "./models/get-inverter-all-point/response";
import {Token} from "./models/shared/token-schema";
import {ApiGetInverterDataRequestBody, getInverterDataRequestBodySchema} from "./models/get-inverter-data/request-body";
import {getInverterDataResponseSchema, GetInverterDataResponseType} from "./models/get-inverter-data/response";

export class GoodWeApi extends ApiRequestHandler {
  private readonly username: string;
  private readonly password: string;
  private readonly stationID: string;
  private readonly apiBaseUrl = 'https://www.semsportal.com/api/v3';

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
    login: '/Common/CrossLogin',
    getInverterAllPoint: '/PowerStation/GetInverterAllPoint',
    getInverterData: '/Inverter/GetInverterData',
  }

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

  async GetInverterData({ token, serialNumber }: {token: Token; serialNumber: string}): Promise<GetInverterDataResponseType | void> {
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
}
