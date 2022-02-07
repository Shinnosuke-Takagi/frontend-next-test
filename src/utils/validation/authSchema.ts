import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('メールアドレスの形式で入力してください')
    .required('メールアドレスは必須です'),
  password: yup.string().required('パスワードは必須です').min(8),
});
