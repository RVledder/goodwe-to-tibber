import {ApiRequestHandler} from "../utils/api-request-handler";
import {ApiCrossLoginRequestBody} from "./models/cross-login/request-body";
import {loginResponseSchema, LoginResponseType} from "./models/cross-login/response";
import {ApiGetInverterDataAllRequestBody} from "./models/get-inverter-all-data/request-body";
import {getInverterAllDataResponseSchema, GetInverterAllDataResponseType} from "./models/get-inverter-all-data/response";
import {Token} from "./models/shared/token-schema";

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
    getInverterAllData: '/PowerStation/GetInverterAllPoint',
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
        // Note: Somehow the API expects the token to be base64 encoded
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
        schema: loginResponseSchema
      });
    } catch (error) {
      console.error('SEMS authentication error:', error);
    }
  }

  async getInverterData({ token }: {token: Token}): Promise<GetInverterAllDataResponseType | void> {
    try {
      const headers = {
        // Note: Somehow the API expects the token to be base64 encoded
        'Token': btoa(JSON.stringify(token)),
        'Content-Type': 'application/json',
      };

      const body: ApiGetInverterDataAllRequestBody = {
        powerStationId: this.stationID,
      };

      const url = this.apiBaseUrl + this.endPoints.getInverterAllData;

      return this.makeAndRequestAndValidate<GetInverterAllDataResponseType>({
        url,
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        schema: getInverterAllDataResponseSchema
      });
    } catch(error) {
      console.error('SEMS GetInvertedData Error:', error);
    }
  }
}
