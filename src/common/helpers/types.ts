export type RouteDefaultMessageResponseType = {
  message: string
}


export type RouteDefaultCreatedResponseType = {
  id: string | number
}

export enum DownloadQueueAudioType {
 'm4a' = 'm4a',
 'mp3' = 'mp3',
 'wav' = 'wav'
}

export enum DownloadQueueVideoType {
  'mp4' = 'mp4',
  'mkv' = 'mkv',
  'webm' = 'webm'
 }

export enum DownloadQueueType {
  'VIDEO' = 'VIDEO',
  'AUDIO' = 'AUDIO'
 }