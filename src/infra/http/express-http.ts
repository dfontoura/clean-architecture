import express from "express";
import Http from "./http";

export default class ExpressHttp implements Http {
    app: any;

    constructor () {
        this.app = express();
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