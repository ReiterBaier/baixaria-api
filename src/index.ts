import { logger } from './configs/logger';
import { server } from './server';


server().then((app) => {
  const port = process.env.PORT || 3000;

  app.listen(port, async () => {
    logger.info(`Serviço iniciado na porta ${port}`);
  });


});
