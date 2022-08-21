import { Config } from '../helpers/config.helper';

export const IMAGE_MIMETYPE: string[] = [
  'image/jpg',
  'image/JPG',
  'image/jpeg',
  'image/JPEG',
  'image/png',
  'image/PNG',
  'image/webp',
  'image/WEBP',
];

export const DEFAULT_IMAGE_PATH = {
  PROFILE: `https://${Config.get('S3_BUCKET')}.s3.${Config.get(
    'S3_REGION',
  )}.amazonaws.com/organizer/profile/default_profile.webp`,
  BANNER: `https://${Config.get('S3_BUCKET')}.s3.${Config.get(
    'S3_REGION',
  )}.amazonaws.com/organizer/profile/default_banner.webp`,
};
