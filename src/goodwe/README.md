# GoodWe API

This API is as good as un-documented. The only way to get information it to use their [Swagger API](http://www.goodwe-power.com:82/swagger/ui/index) 
and reverse engineering some other implementations.

It seems the GoodWe API provides a structure across different versions. 
Meaning the end points are not consistent across versions, but newer versions contain
different end points. Different versions offer distinct sets of feature and data.

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

### `/v3/Common/CrossLogin`

This endpoint is used for authentication. It returns a token object which can be used in other requests.

### `/v3/PowerStation/GetInverterAllPoint`

This endpoint retrieves detailed information about the inverter's operational data and status.

It contains an inverterPoints array, each item in the array representing a different inverter.

<details>
  <summary>An inverter point response contains the following:</summary>
  <div>
    <ol>
      <li><strong>Serial Number (sn):</strong> The serial number of the inverter.</li>
      <li><strong>Dictionary (dict):</strong> Contains two arrays, left and right, each holding key-value pairs of inverter data.
        <ul>
          <li><strong>Left Array:</strong> Contains key-value pairs related to the inverter's device type, serial number, capacity, connection time, power, voltage, current, and frequency.</li>
          <li><strong>Right Array:</strong> Contains key-value pairs related to the inverter's internal temperature, DC voltage and current, signal strength, and power factor.</li>
        </ul>
      </li>
      <li><strong>Points (points):</strong> The points represent a specific data metric or measurement related to the inverter's performance or status. The points property in the inverterPoints object represents predefined metrics or measurements related to the inverter's performance or status. These points serve as a schema for potential data that the inverter might report. The actual values for these points can be found in the dict property (within the left and right arrays) and as root properties of the inverterPoints object.</li>
      <li><strong>Other properties:</strong> The inverterPoints object also contains other properties like the inverter's device type, serial number, capacity, connection time, power, voltage, current, and frequency.</li>
    </ol>
  </div>
</details>

### `/v3/Inverter/GetInverterData`

This endpoint retrieves the inverter's operational data and status.

The data property contains detailed information about the inverter's operational status and metrics. 

> Note: The data property is a stringified JSON object

<details>
  <summary>An inverter point response contains the following:</summary>
  <div>
    <ul>
      <li><strong>Vpv1, Vpv2, Vpv3, Vpv4, Vpv5, Vpv6:</strong> DC voltage values from different photovoltaic inputs.</li>
      <li><strong>Ipv1, Ipv2, Ipv3, Ipv4, Ipv5, Ipv6:</strong> DC current values from different photovoltaic inputs.</li>
      <li><strong>Vac1, Vac2, Vac3:</strong> AC voltage values for different phases.</li>
      <li><strong>Iac1, Iac2, Iac3:</strong> AC current values for different phases.</li>
      <li><strong>Fac1, Fac2, Fac3:</strong> AC frequency values for different phases.</li>
      <li><strong>ETotal:</strong> Total energy produced (kWh).</li>
      <li><strong>EDay:</strong> Energy produced today (kWh).</li>
      <li><strong>Pac:</strong> Current power output (W).</li>
      <li><strong>Tempperature:</strong> (response contains typo*) Internal temperature of the inverter (°C).</li>
      <li><strong>WorkMode:</strong> Current operational mode of the inverter.</li>
      <li><strong>FirmwareVersion:</strong> Firmware version of the inverter.</li>
      <li><strong>ErrorMessage:</strong> Error message code.</li>
      <li><strong>WarningCode:</strong> Warning message code.</li>
      <li><strong>LoadPower:</strong> Power consumed by the load (W).</li>
      <li><strong>TotalPower:</strong> Total power output (W).</li>
    </ul>
  </div>
</details>

### `/v2/Charts/GetPlantPowerChart`

This endpoint retrieves the power output of a plant over a specified time period.
The GoodWe SEMS portal uses this end point to build a graph chart to display the power output of a plant over time, with intervals of 5 minutes.

It accepts a 'date' parameter for the data and returns information about the power output of the plant for that date.

The data property contains detailed information about the power generation and financial metrics of a solar plant. 

<details>
  <summary>It includes two main sections:</summary>
  <div>
    <ul>
      <li><strong>generateData</strong> An array of key-value pairs representing the total energy generated (kWh) and the corresponding income.</li>
      <li><strong>lines</strong> An array of objects representing the power output over time. Each object includes properties such as the key, unit, color, and an array of time-series data points (xy), where each point contains the time (x), power output (y), and an optional third value (z).</li>
    </ul>
  </div>
</details>

### `/v1/Statistics/GetStatisticsCharts`

This endpoint retrieves the power output of a plant over a specified time period.
The response is data that can be used for a chart.

It accepts a 'date' parameter for the data and returns information about the power output of the plant for that date.

You can query this end point for a month (`type 3`) or year (`typ 4`). Day is not supported.

<details>
  <summary>It includes two main sections:</summary>
  <div>
    <ul>
      <li><strong>yield</strong> An array of key-value pairs (`x` =  and `y`) representing the total energy generated (kWh) and the corresponding income.</li>
      <li><strong>income</strong> An array of key-value pairs (`x`= date and `y` = amount in currency) representing the total income generated.</li>
    </ul>
  </div>
</details>

### `/v1/Statistics/GetStatisticsData`

This endpoint retrieves the power output of a plant over a specified time period.
The response is data that can be used in a data table.

It accepts a 'date' parameter for the data and returns information about the power output of the plant for that date.

You can query this end point for a month (`type 3`) or year (`typ 4`). Day is not supported.


<details>
  <summary>The data property contains mainly these properties:</summary>
  <div>
    <ul>
      <li><strong>title</strong> The title of the data table.</li>
      <li><strong>page</strong> Properties for pagination.</li>
      <li><strong>cols</strong> The columns of the data table.</li>
      <li><strong>rows</strong> The rows of the data table.</li>
    </ul>
  </div>
</details>

## Terminology

| Key         | Description                                                                                                                                            |
|-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| GoodWe      | A Chinese solar inverter manufacturer.                                                                                                                  |
| SEMS | Smart Energy Management System. A cloud-based monitoring platform that allows users to monitor and manage their solar photovoltaic (PV) installations. |
| Power plant | Refers to an individual and entire solar photovoltaic (PV) installation or system. (Not just the inverter, but the system as a whole including panels) |
| Solar photovoltaic (PV) installations | Convert sunlight directly into electricity using semiconductor materials. Main components: Solar panels, mounting structures, inverters,               |
| Inverter    | Converts direct current (DC) electricity generated by solar panels into alternating current (AC) electricity for use in homes and businesses.         |

## References

- GoodWe SEMS API Swagger http://www.goodwe-power.com:82/swagger/ui/index

## Final Notes:

The `/v3/Inverter/GetInverterData` endpoint is the most useful for getting real-time data from the inverter. Use the Pac property for the current power output.
The `/v2/Charts/GetPlantPowerChart` endpoint is useful for getting historical data. 
The `/v1/Statistics/GetStatisticsCharts` endpoint might be used to get historical data.
