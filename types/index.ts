export enum QueryKeys {
  me = 'me',
  videos = 'videos',
}

export interface Me {
  id: string;
  email: string;
  username: string;
}
