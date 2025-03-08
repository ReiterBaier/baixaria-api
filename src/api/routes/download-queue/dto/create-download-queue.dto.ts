import { IsString } from 'class-validator';

export class CreateDownloadQueueDto {

  @IsString()
  url: string;

}
