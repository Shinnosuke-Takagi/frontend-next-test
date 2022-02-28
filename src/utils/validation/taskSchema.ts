import * as yup from 'yup';

export const saveTaskSchema = yup.object({
  content: yup.string().required('content is required'),
});
