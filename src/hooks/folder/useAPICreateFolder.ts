import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { Folder } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { createFolderURL } from 'src/utils/url/folder.url';
import { jsonHeader } from 'src/utils/url/header';

const createFolder = async (folder: Partial<Folder>): Promise<Folder> => {
  const response = await axiosInstance.post(createFolderURL, folder, {
    headers: jsonHeader,
  });
  return response.data;
};

export const useAPICreateFolder = (
  mutationOptions?: UseMutationOptions<
    Folder,
    AxiosError,
    Partial<Folder>,
    unknown
  >,
) => {
  return useMutation<Folder, AxiosError, Partial<Folder>>(
    createFolder,
    mutationOptions,
  );
};
