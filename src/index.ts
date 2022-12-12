import Api from "./api";

interface Streams {
    "streams": StreamData[]
}

interface StreamData {
    stream: Label;
    values: [string, string][];
}

interface Label {
    label: string
}

export default class Client extends Api {
    protected readonly data: Streams = {
        streams: []
    };

    /**
     * Health heck for API endpoint
     */
    public async storageHealthCheck(): Promise<boolean> {
        try {
            const response = await this.instance.get('/ready');

            return response.status === 200
        } catch (error) {
            return false;
        }
    };

    /**
     * Retrieve all streams
     */
    public getStreams() {
        return this.data;
    }

    /**
     * Adding stream to the list of streams
     *
     * @param label
     * @param values
     */
    public addStream(label: string, values: [string, string][]): this {
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
     public async push(): Promise<boolean> {
        if (this.data.streams.length) {
            try {
                const response = await this.instance.post('/loki/api/v1/push', this.data);

                this.data.streams = [];

                return true;
            } catch (e) {
                return false;
            }
        }

        return false;
    };
}