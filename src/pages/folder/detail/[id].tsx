import { useAPIGetFolderDetail } from '@/hooks/folder/useAPIGetFolderDetail';
import {
  Badge,
  Box,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Folder } from 'src/types';

const FolderDetail = () => {
  const [folder, setFolder] = useState<Folder>();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data: fetchedFolder, isLoading } = useAPIGetFolderDetail(Number(id));
  useEffect(() => {
    setFolder(fetchedFolder);
  }, [fetchedFolder]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : folder ? (
        <>
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  New
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2">
                  {folder.author.name}
                </Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {folder.title}
              </Box>

              <Box display="flex" mt="2" alignItems="center">
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {folder.createdAt}
                </Box>
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {folder.updatedAt}
                </Box>
              </Box>
            </Box>
          </Box>
          <UnorderedList>
            {folder.tasks?.length &&
              folder.tasks.map((t) => (
                <ListItem key={t.id}>
                  <Link href={`/task/detail/${t.id}`} passHref>
                    <a>{t.content}</a>
                  </Link>
                </ListItem>
              ))}
          </UnorderedList>
        </>
      ) : (
        <Text>フォルダーの詳細が取得できませんでした。</Text>
      )}
    </>
  );
};

export default FolderDetail;
