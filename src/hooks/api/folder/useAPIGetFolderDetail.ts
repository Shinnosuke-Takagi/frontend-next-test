import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Folder } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { getFolderDetailURL } from 'src/utils/url/folder.url';

const getFolderDetail = async (id: number): Promise<Folder> => {
  const response = await axiosInstance.get(`${getFolderDetailURL}/${id}`);
  return response.data;
};

export const useAPIGetFolderDetail = (id: number) => {
  return useQuery<Folder, AxiosError>(['getFolderDetail', id], () =>
    getFolderDetail(id),
  );
};
