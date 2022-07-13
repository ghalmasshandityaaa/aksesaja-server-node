import { extname } from "path";
import multer, { memoryStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { Config } from "./config.helper";

export const imageFileFilter = (_: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF)$/)) {
    return callback(new Error('File is not allowed!'), false);
  }
  callback(null, true);
};

const aksesajaImage = (file: any) => {
  const fileExtName = extname(file.originalname);
  const fileName = `AKS_${uuidv4()}_${Date.now()}${fileExtName}`.replace(/\s/g, '_');
  return fileName;
}

export const upload = multer({
  storage: memoryStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: 4000000 }
});

const s3: any = new S3({
  accessKeyId: Config.get('S3_ACCESS_KEY_ID'),
  secretAccessKey: Config.get('S3_SECRET_ACCESS_KEY'),
  region: Config.get('S3_REGION'),
});

export const uploadS3 = async (destination: string, file: any) => {
  const uploadParams: any = {
    Bucket: Config.get('S3_BUCKET'),
    Key: `${destination}/${aksesajaImage(file)}`,
    Body: file.buffer,
  }

  try {
    const result = await s3.upload(uploadParams).promise();
    return result;
  } catch (e) {
    console.log('uploadS3', e.message);
    return e;
  }
}

export const uploadArrayS3 = async (destination: string, file: any) => {
  const uploadParams: any = file.map((file: any) => {
    return {
      Bucket: Config.get('S3_BUCKET'),
      Key: `${destination}/${aksesajaImage(file)}`,
      Body: file.buffer,
    }
  })

  try {
    const result = await Promise.all(uploadParams.map((params: any) => s3.upload(params).promise()));
    return result;
  } catch (e) {
    console.log('uploadS3', e.message);
    return e;
  }
}

export const getObjectS3 = async (fileKey: string) => {
  const uploadParams: any = {
    Bucket: Config.get('S3_BUCKET'),
    Key: `${fileKey}`,
  }

  try {
    const result = await s3.getObject(uploadParams).promise();
    return result;
  } catch (e) {
    console.log('getObjectS3', e.message);
    return e;
  }
}