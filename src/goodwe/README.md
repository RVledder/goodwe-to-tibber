# GoodWe API

This API is as good as un-documented. The only way to get information it to use their [Swagger API](http://www.goodwe-power.com:82/swagger/ui/index) 
and reverse engineering some other implementations.

## Authentication

The way to authenticate to this API is by requesting a token from the login endpoint (`<base-url>/Common/CrossLogin`).
This end point also requires a token, but this token can be an empty 'Token' object. (see `./api.ts`)

These tokens can be sent with the API requests in the header.

> Note: Somehow the end points require that the tokens are encoded with [btoa](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa) and not a different base64 encoding. (because btoa adds padding characters '=' to ensure the output length is a multiple of 4)

The "CrossLogin" end-point then in turn returns a token object which you can then use in other requests
for authentication.

## References

- GoodWe SEMS API Swagger http://www.goodwe-power.com:82/swagger/ui/index
