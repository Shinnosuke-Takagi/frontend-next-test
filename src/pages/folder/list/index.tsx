/* eslint-disable prettier/prettier */
import { useAPIGetFolderList } from '@/hooks/folder/useAPIGetFolderList';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Folder } from 'src/types';

const FolderList = () => {
  const [folders, setFolders] = useState<Folder[]>();
  const { data: fetchedFolders } = useAPIGetFolderList();
  useEffect(() => {
    setFolders(fetchedFolders);
  }, [fetchedFolders]);

  return (
    <UnorderedList>
        {folders?.length && folders.map((f) => (
            <ListItem key={f.id}>
                <Link href={`/folder/detail/${f.id}`} passHref>
                    <a>{f.title}</a>
                </Link>
            </ListItem>
        ))}
    </UnorderedList>
  )
};

export default FolderList;
