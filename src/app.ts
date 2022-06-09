import express, { NextFunction, Request, Response } from 'express';
import { errors } from "celebrate";
import "express-async-errors";
import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import "dotenv/config"
import { router } from './routes';

import handleException from './middleware/exceptionMiddleware';
import urlNotFoundHandler from './middleware/notfoundMiddleware';

const app = express()

app.use(bodyParser.json());

app.use(router);
// app.use(errors());
app.use(handleException);
app.use(urlNotFoundHandler);
app.use(cors());

import "./container";

export { app };