import downloadQueue from './api/queues/downloadQueue';
import { exec } from 'child_process';
import { logger } from './configs/logger';

// Processa os jobs da fila
downloadQueue.process(10, async (job) => {
  logger.info('JOB: ' + JSON.stringify(job))
  const url = job.data.dto.url;
  logger.info('URL: ' + url)
  return new Promise<string>((resolve, reject) => {

    const firstCommand = `yt-dlp -j "${url}"`
    const command = `yt-dlp -x --audio-format m4a --embed-thumbnail --add-metadata -o "~/Downloads/%(title)s.%(ext)s" "${url}"`;
    logger.info(`Executando comando: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        logger.error(`Erro no job ${job.id}:`, error);
        return reject(error);
      }
      if (stderr) {
        logger.error(`Stderr no job ${job.id}:`, stderr);
      }
      logger.info(`Job ${job.id} concluído com sucesso.`);
      resolve(stdout);
    });
  });
});

// Eventos para monitorar o andamento dos jobs
downloadQueue.on('completed', (job, result) => {
  logger.info(`Job ${job.id} completado com sucesso: ${result}`);
});

downloadQueue.on('failed', (job, err) => {
  logger.error(`Job ${job.id} falhou: ${err}`);
});
