# GoodWe API

This API is as good as un-documented. The only way to get information it to use their [Swagger API](http://www.goodwe-power.com:82/swagger/ui/index) 
and reverse engineering some other implementations.

## Authentication

The way to authenticate to this API is by requesting a token from the login endpoint (`<base-url>/Common/CrossLogin`).
This end point also requires a token, but this token can be an empty 'Token' object. (see `./api.ts`)

These tokens can be sent with the API requests in the header.

> Note: Somehow the end points require that the tokens are encoded with [btoa](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa) and not a different base64 encoding. (because btoa adds padding characters '=' to ensure the output length is a multiple of 4)

The "CrossLogin" end-point then in turn returns a **short-lived** token object which you can then use in other requests
for authentication.

The token object contains the following:

```json
{
  "uid": "<uid>",
  "timestamp": 1728837293524,
  "token": "<short-lived-token>",
  "client": "web",
  "version": "",
  "language": "en-en"
}
```

Where the timestamp is the creation date.

## End points

### `/Common/CrossLogin`

This endpoint is used for authentication. It returns a token object which can be used in other requests.

### `/PowerStation/GetInverterAllPoint`

This endpoint retrieves detailed information about the inverter's operational data and status.

It contains an inverterPoints array, each item in the array representing a different inverter.

An inverter point contains the following:

1. **Serial Number (sn):** The serial number of the inverter.
2. **Dictionary (dict):** Contains two arrays, left and right, each holding key-value pairs of inverter data.
   - **Left Array:** Contains key-value pairs related to the inverter's device type, serial number, capacity, connection time, power, voltage, current, and frequency.
   - **Right Array:** Contains key-value pairs related to the inverter's internal temperature, DC voltage and current, signal strength, and power factor.
3. **Points (points):** The points represent a specific data metric or measurement related to the inverters performance or status.
   The points property in the inverterPoints object represents predefined metrics or measurements related to the inverter's performance or status. These points serve as a schema for potential data that the inverter might report. The actual values for these points can be found in the dict property (within the left and right arrays) and as root properties of the inverterPoints object.

4. **Other properties:** The inverterPoints object also contains other properties like the inverter's device type, serial number, capacity, connection time, power, voltage, current, and frequency.

### `/Inverter/GetInverterData`

This endpoint retrieves the inverter's operational data and status.

The data property in the goodwe-inverter-data.json file contains detailed information about the inverter's operational status and metrics. 

> Note: The data property is a stringified JSON object

Below are some key fields included in the data property:

- **Vpv1, Vpv2, Vpv3, Vpv4, Vpv5, Vpv6:** DC voltage values from different photovoltaic inputs.
- **Ipv1, Ipv2, Ipv3, Ipv4, Ipv5, Ipv6:** DC current values from different photovoltaic inputs.
- **Vac1, Vac2, Vac3:** AC voltage values for different phases.
- **Iac1, Iac2, Iac3:** AC current values for different phases.
- **Fac1, Fac2, Fac3:** AC frequency values for different phases.

- **ETotal:** Total energy produced (kWh).
- **EDay:** Energy produced today (kWh).
- **Pac:** Current power output (W).

- **Tempperature:** (response contains typo*) Internal temperature of the inverter (°C).
- **WorkMode:** Current operational mode of the inverter.
- **FirmwareVersion:** Firmware version of the inverter.
- **ErrorMessage:** Error message code.
- **WarningCode:** Warning message code.
- **LoadPower:** Power consumed by the load (W).
- **TotalPower:** Total power output (W).

## References

- GoodWe SEMS API Swagger http://www.goodwe-power.com:82/swagger/ui/index
