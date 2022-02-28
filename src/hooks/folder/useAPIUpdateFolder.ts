import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { Folder } from 'src/types';
import { axiosInstance } from 'src/utils/url';
import { updateFolderURL } from 'src/utils/url/folder.url';
import { jsonHeader } from 'src/utils/url/header';

const updateFolder = async (folder: Partial<Folder>): Promise<Folder> => {
  const response = await axiosInstance.patch(updateFolderURL, folder, {
    headers: jsonHeader,
  });
  return response.data;
};

export const useAPIUpdateFolder = (
  mutationOptions?: UseMutationOptions<
    Folder,
    AxiosError,
    Partial<Folder>,
    unknown
  >,
) => {
  return useMutation<Folder, AxiosError, Partial<Folder>>(
    updateFolder,
    mutationOptions,
  );
};
