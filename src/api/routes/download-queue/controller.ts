import { Body, Get, JsonController, Param, Post } from 'routing-controllers';
import { DownloadQueueServices } from './service';
import { CreateDownloadQueueDto } from './dto/create-download-queue.dto';

@JsonController('/download-queue')
export class DownloadQueueControllers {
  private readonly service: DownloadQueueServices;

  constructor() {
    this.service = new DownloadQueueServices();
  };

  @Post()
  async create(
    @Body() dto: CreateDownloadQueueDto,
  ) {
    const jobId = await this.service.create(dto);
    return { jobId, message: 'Download inserido na fila.' };
  };

  @Get()
  async getAll() {
    return this.service.getAll();
  };

  @Get('/:id')
  async getOne(
    @Param('id') id: string
  ) {
    return this.service.getOne(id);
  };

};
