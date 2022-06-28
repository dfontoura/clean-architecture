import express from "express";
import Http from "./http";

export default class ExpressHttp implements Http {
    app: any;

    constructor () {
        this.app = express();

        this.app.use(express.json());

        // @ts-ignore
        this.app.all('*', (request: any, response: any, next) => {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.header(
                'Access-Control-Allow-Headers', 
                'Content-Type, X-access-token, , Authorization');
            next();
        });

        // @ts-ignore
        this.app.options('*', (request: any, response: any) => {
            response.end();
        });
    }

    async route(method: string, url: string, callback: any): Promise<any> {
        this.app[method](url, async (request: any, response: any) => {
            const result = await callback(request.params, request.body);
            response.json(result);
        })
    }

    async listen(port: number): Promise<void> {
        await this.app.listen(port);
    }
    
}