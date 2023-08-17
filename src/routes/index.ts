import { Application } from "express";
import Router from 'express';
import { filmeRouter } from "./filme";
import { serieRouter } from "./serie";


export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/filme',filmeRouter);
    apiRouter.use('/serie',serieRouter)

    app.use('/api/v1', apiRouter);
}