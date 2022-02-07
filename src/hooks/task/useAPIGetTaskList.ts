import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Task } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { getTaskListURL } from 'src/utils/url/task.url';

const getTaskList = async (): Promise<Task[]> => {
  const response = await axiosInstance.get(getTaskListURL);
  return response.data;
};

export const useAPIGetTaskList = () => {
  return useQuery<Task[], AxiosError>('getTaskList', getTaskList);
};
