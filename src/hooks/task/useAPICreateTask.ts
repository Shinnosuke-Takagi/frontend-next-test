import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { Task } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { jsonHeader } from 'src/utils/url/header';
import { createTaskURL } from 'src/utils/url/task.url';

const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance.post(createTaskURL, task, {
    headers: jsonHeader,
  });
  return response.data;
};

export const useAPICreateTask = (
  mutationOptions?: UseMutationOptions<
    Task,
    AxiosError,
    Partial<Task>,
    unknown
  >,
) => {
  return useMutation<Task, AxiosError, Partial<Task>>(
    createTask,
    mutationOptions,
  );
};
