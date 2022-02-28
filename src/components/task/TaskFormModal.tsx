import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { Folder, Task } from 'src/types';
import { saveTaskSchema } from 'src/utils/validation/taskSchema';

type TaskFormModalProps = {
  saveTask: (task: Partial<Task>) => void;
  folder?: Folder;
  task?: Task;
};

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  saveTask,
  folder,
  task,
}) => {
  const initialValues = {
    folder,
    content: '',
  };
  const { onOpen, isOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { values, errors, handleChange, handleSubmit } = useFormik<
    Partial<Task>
  >({
    initialValues: task || initialValues,
    validationSchema: saveTaskSchema,
    onSubmit: (values) => {
      saveTask(values);
      onClose();
    },
  });

  return (
    <>
      <Button onClick={onOpen}>{task ? 'Edit Task' : 'New Task'}</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {task ? 'Edit the task' : 'Create new task'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Content</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Content"
                name="content"
                type="text"
                onChange={handleChange}
                value={values.content}
              />
              {errors.content && <div>{errors.content}</div>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleSubmit()}>
              {task ? 'Update' : 'Create'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskFormModal;
