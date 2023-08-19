import * as express from 'express';
declare namespace jsonparser {
    interface JsonParserOptions {
        strict?: Boolean;
        bodyCheck?: Boolean;
        type?: String;
    }
}
declare module "express" {
    interface Request {
        json: Object;
        body: string;
    }
}
declare function jsonparser({strict, bodyCheck, type}?: jsonparser.JsonParserOptions): express.RequestHandler;
export = jsonparser;
