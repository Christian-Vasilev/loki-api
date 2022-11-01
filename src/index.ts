import Api from "./api";

interface Streams {
    "streams": StreamData[]
}

interface StreamData {
    stream: object,
    values: [string, string][]
}

export default class Client extends Api {
    data: Streams = {
        streams: []
    };

    /**
     * Health heck for API endpoint
     */
    public storageHealthCheck = async (): Promise<boolean> => {
        try {
            const response = await this.instance.get('/ready');

            return response.status === 200
        } catch (error) {
            return false;
        }
    };

    /**
     * Adding stream to the list of streams
     *
     * @param label
     * @param values
     */
    public addStream = (label: string, values: [string, string][]): this => {
        const newStream: StreamData = {
            "stream": {
                label
            },
            values
        }

        this.data.streams.push(newStream);

        return this;
    };

    /**
     * Pushing to the API the already appended streams to the list of streams.
     */
    public push = async (): Promise<boolean> => {
        if (this.data.streams.length) {
            try {
                const response = await this.instance.post('/loki/api/v1/push', this.data);

                return true;
            } catch (e) {
                return false;
            }
        }

        return false;
    };
}