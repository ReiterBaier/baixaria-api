import downloadQueue from './api/queues/downloadQueue';
import { exec } from 'child_process';
import { logger } from './configs/logger';
import { DownloadQueueType } from './common/helpers/types';

// Processa os jobs da fila
downloadQueue.process(10, async (job) => {
  const url = job.data.dto.url;
  const path = job.data.dto.path;
  const type = job.data.dto.type;
  const audioType = job.data.dto.audioType;
  const videoType = job.data.dto.videoType;
  return new Promise<string>((resolve, reject) => {

    const firstCommand = `yt-dlp -j "${url}"`
    let command = '';
    if (type === DownloadQueueType.VIDEO) {
      command = `yt-dlp -o "${path}/%(title)s.%(ext)s" -f "bestvideo[height=1080]+bestaudio/best[height=1080]" --recode-video ${videoType} "${url}"`
    } else {
      command = `yt-dlp -x --audio-format ${audioType} --embed-thumbnail --add-metadata -o "${path}/%(title)s.%(ext)s" "${url}"`;
    };
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
