import { AxiosError } from 'axios';
import { UseMutationOptions, useMutation } from 'react-query';
import { Task } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { jsonHeader } from 'src/utils/url/header';
import { updateTaskURL } from 'src/utils/url/task.url';

const updateTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance.patch(updateTaskURL, task, {
    headers: jsonHeader,
  });
  return response.data;
};

export const useAPIUpdateTask = (
  mutationOptions?: UseMutationOptions<
    Task,
    AxiosError,
    Partial<Task>,
    unknown
  >,
) => {
  return useMutation<Task, AxiosError, Partial<Task>>(
    updateTask,
    mutationOptions,
  );
};
