import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Task } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { getTaskDetailURL } from 'src/utils/url/task.url';

const getTaskDetail = async (id: number): Promise<Task> => {
  const response = await axiosInstance.get(`${getTaskDetailURL}/${id}`);
  return response.data;
};

export const useAPIGetTaskDetail = (id: number) => {
  return useQuery<Task, AxiosError>(['getTaskDetail', id], () =>
    getTaskDetail(id),
  );
};
