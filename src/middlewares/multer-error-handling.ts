import multer from 'multer';

export const MulterErrorHandling = (error: any, _req: any, res: any, __next: any) => {
  if (error instanceof multer.MulterError) {
    let err: string | null = null;

    if (error.code === 'LIMIT_FILE_SIZE') {
      err = 'File size is too large';
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      err = 'Max file count exceeded';
    } else if (error.code === 'LIMIT_PART_COUNT') {
      err = 'Max part count exceeded';
    } else if (error.code === 'LIMIT_FIELD_KEY') {
      err = 'Max field key exceeded';
    } else if (error.code === 'LIMIT_FIELD_VALUE') {
      err = 'Max field value exceeded';
    } else if (error.code === 'LIMIT_FIELD_COUNT') {
      err = 'Max field count exceeded';
    } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      err = 'Unexpected file';
    } else if (error.code === 'LIMIT_INPUT_SIZE') {
      err = 'Max input size exceeded';
    }

    if (err) {
      return res.status(400).json({
        message: 'Error',
        error: err,
      });
    }
  }
};
