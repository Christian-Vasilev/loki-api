# loki-api

Loki is a part of the Grafana Labs. This package helps
with the communication of the HTTP API using AXIOS.

## Installation

```
npm i loki-api
```

## Example Usage

---- 

### Adding a new stream to the list of streams

```typescript
const client = new Client({
    baseURL: 'http://localhost:3100/'
});

client.addStream('TestLabel', [
    [
        "1667032608500000000",
        JSON.stringify({
            level: 'info',
            messsage: '"Connection has been established successfully."',
            meta: '{}'
        })
    ],
    [
        "1667032608600000000",
        "Everything looks fine"
    ],
]).push();
```

### Check if the API is available
```typescript
(async () => {
    const client = new Client({
        baseURL: 'http://localhost:3100/'
    });

    const isStorageAvailable = await client.storageHealthCheck();

    if (isStorageAvailable) {
        // Log something in the database
    } else {
        // Add some timeout and try again or fail
    }
})();
```

The client instance is based of the [Axios Request Config](https://axios-http.com/docs/req_config). Since Loki doesn't have any
authentication methods, it's a good practice to hide it behind a reverse proxy with basic auth.
The config **Axios Config Options** can be used to achieve such authentication with HTTP Basic Auth request.

---
## Things to do:

Use the built-in continuous integration in GitLab.

- [ ] Write test for the Package
- [ ] Add more endpoints for api communication

***

## Http endpoints covered:
- [ ] `/loki/api/v1/push`
- [ ] `/ready`

All endpoints can be found [here](https://grafana.com/docs/loki/latest/api/)



## Feedback

If you have any feedback, please feel free to open an issue.


## Author Information
The project originally started and is maintained by [Rumen Yanev](https://gitlab.com/rumaviio), [Kristian Vasilev](https://github.com/christian-vasilev) and [Yordan Yordanov](https://gitlab.com/dankata1231)


## License

MIT License

Copyright (c) 2022 Christian Vasilev and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.