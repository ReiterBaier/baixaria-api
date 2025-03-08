import { CreateDownloadQueueDto } from "./dto/create-download-queue.dto";
import { RouteDefaultCreatedResponseType } from "../../../common/helpers/types";
import downloadQueue from "../../queues/downloadQueue";
import { logger } from "../../../configs/logger";

export class DownloadQueueServices {
  
  async create(dto: CreateDownloadQueueDto): Promise<RouteDefaultCreatedResponseType> {
    try {
      const job = await downloadQueue.add({ dto });
      logger.info(`Job ${job.id} criado...`);
      return { id: job.id };
    } catch (error) {
      const errMessage = 'Erro ao criar job: ' + error;
      logger.error(errMessage);
      throw new Error(errMessage);
    };
  };

  async getAll(): Promise<any[]> {
    try {
      const waitingJobs = await downloadQueue.getJobs(['waiting']);
      const activeJobs = await downloadQueue.getJobs(['active']);
      const completedJobs = await downloadQueue.getJobs(['completed']);
      const failedJobs = await downloadQueue.getJobs(['failed']);

      const allJobs = [...waitingJobs, ...activeJobs, ...completedJobs, ...failedJobs];

      const jobsInfo = await Promise.all(
        allJobs.map(async (job) => {
          const state = await job.getState();
          return { id: job.id, data: job.data, state };
        })
      );

      return jobsInfo;
    } catch (error) {
      logger.error('Erro ao obter jobs: ' + error);
      throw new Error('Erro ao obter jobs: ' + error);
    }
  };

  async getOne(id: string): Promise<any> {
    try {
      const job = await downloadQueue.getJob(id);
      if (!job) {
        return { message: `Job com ID ${id} não encontrado.` };
      }
      const state = await job.getState();
      return { id: job.id, data: job.data, state };
    } catch (error) {
      logger.error(`Erro ao obter job ${id}: ` + error);
      throw new Error(`Erro ao obter job ${id}: ` + error);
    };
  };

};
