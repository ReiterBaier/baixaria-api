import path from 'path';
import { Express } from 'express';
import { createExpressServer } from 'routing-controllers';
import 'reflect-metadata';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import downloadQueue from './api/queues/downloadQueue';

const controllersPath = path.resolve(__dirname, 'api', 'routes', '**', 'controller.*');
const middlewaresPath = path.resolve(__dirname, 'api', 'middlewares', '*.middleware.*');


const app: Express = createExpressServer({
  cors: '*',
  defaultErrorHandler: false,
  controllers: [controllersPath],
  middlewares: [middlewaresPath]
});

const { router: bullBoardRouter } = createBullBoard([
  new BullAdapter(downloadQueue),
]);
app.use('/board/queues', bullBoardRouter);

export const server = async () => {

  return app;
};
