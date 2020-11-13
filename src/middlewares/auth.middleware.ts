import { Request, Response } from 'express';

export function auth(req: Request, res: Response, next: Function) {
    console.log(`Request... auth`);
    next();
};