import multer from 'multer';

export const multerErrorHandling = (error: any, _req: any, res: any, __next: any) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Error', error: 'File size is too large' });
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ message: 'Error', error: 'Max file count exceeded' });
    } else if (error.code === 'LIMIT_PART_COUNT') {
      return res.status(400).json({ message: 'Error', error: 'Max part count exceeded' });
    } else if (error.code === 'LIMIT_FIELD_KEY') {
      return res.status(400).json({ message: 'Error', error: 'Max field key exceeded' });
    } else if (error.code === 'LIMIT_FIELD_VALUE') {
      return res.status(400).json({ message: 'Error', error: 'Max field value exceeded' });
    } else if (error.code === 'LIMIT_FIELD_COUNT') {
      return res.status(400).json({ message: 'Error', error: 'Max field count exceeded' });
    } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Error', error: 'Unexpected file' });
    } else if (error.code === 'LIMIT_INPUT_SIZE') {
      return res.status(400).json({ message: 'Error', error: 'Max input size exceeded' });
    } else if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Error', error: 'Max file size exceeded' });
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ message: 'Error', error: 'Max file count exceeded' });
    }
  }
};
