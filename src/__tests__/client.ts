import Client from "../index";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const client = new Client({
    baseURL: 'http://localhost:3100/'
});

describe('Healthcheck', () => {
    it('should return true if healthcheck is okay', async () => {
        mock.onGet('/ready').replyOnce(200, true);

        const response = await client.storageHealthCheck();

        expect(response).toEqual(true);
    });

    it('should return false if healthcheck hasn\'t got response code of 200', async () => {
        mock.onGet('/ready').replyOnce(400, false);

        const response = await client.storageHealthCheck();

        expect(response).toEqual(false);
    });
});

