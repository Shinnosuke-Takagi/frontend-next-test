import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Folder } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { getFolderListURL } from 'src/utils/url/folder.url';

const getFolderList = async (): Promise<Folder[]> => {
  const response = await axiosInstance.get(getFolderListURL);
  return response.data;
};

export const useAPIGetFolderList = () => {
  return useQuery<Folder[], AxiosError>('getFolderList', getFolderList);
};
