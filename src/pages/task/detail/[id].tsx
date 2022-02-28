import TaskFormModal from '@/components/task/TaskFormModal';
import { useAPIGetTaskDetail } from '@/hooks/task/useAPIGetTaskDetail';
import { useAPIUpdateTask } from '@/hooks/task/useAPIUpdateTask';
import { Spinner, Box, Badge, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Task } from 'src/types';

const TaskDetail = () => {
  const [task, setTask] = useState<Task>();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const {
    data: fetchedTask,
    isLoading,
    refetch: refetchTask,
  } = useAPIGetTaskDetail(Number(id));
  const { mutate: updateTask } = useAPIUpdateTask({
    onSuccess: () => {
      refetchTask();
    },
    onError: (e) => {
      alert('failed update task');
    },
  });
  useEffect(() => {
    setTask(fetchedTask);
  }, [fetchedTask]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : task ? (
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
                  {task.folder?.author?.name}
                </Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {task.content}
              </Box>

              <Box display="flex" mt="2" alignItems="center">
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {task.createdAt}
                </Box>
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {task.updatedAt}
                </Box>
              </Box>
            </Box>
          </Box>
          <TaskFormModal
            saveTask={updateTask}
            folder={task.folder}
            task={task}
          />
        </>
      ) : (
        <Text>タスクの詳細が取得できませんでした。</Text>
      )}
    </>
  );
};

export default TaskDetail;
