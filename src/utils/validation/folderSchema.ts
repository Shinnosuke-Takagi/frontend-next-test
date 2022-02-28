import * as yup from 'yup';

export const saveFolderSchema = yup.object({
  title: yup.string().required('title is required'),
});
