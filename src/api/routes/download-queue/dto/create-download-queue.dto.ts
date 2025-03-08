import { IsString } from 'class-validator';
import { DownloadQueueAudioType, DownloadQueueType } from '../../../../common/helpers/types';

export class CreateDownloadQueueDto {

  @IsString()
  url: string;

  @IsString()
  path: string;

  @IsString()
  audioType: DownloadQueueAudioType;

  @IsString()
  videoType: DownloadQueueAudioType;
  
  @IsString()
  type: DownloadQueueType;

}
