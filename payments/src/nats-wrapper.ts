import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
    private _client?: Stan;

    get client() {
        if(!this._client) {
            throw new Error('Can not access the client before connecting to NATS');
        }

        return this._client;
    }

    async connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, {
            url,
        });

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connected to NATS');
                resolve();
            });

            this.client.on('error', (err) => {
                console.log('Failed to connect to NATS!');
                reject(err);
            });
        });
    };
}

export const natsWrapper =   new NatsWrapper();