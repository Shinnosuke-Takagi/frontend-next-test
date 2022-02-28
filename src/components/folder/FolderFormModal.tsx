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
import { Folder } from 'src/types';
import { saveFolderSchema } from 'src/utils/validation/folderSchema';

type FolderFormModalProps = {
  saveFolder: (folder: Partial<Folder>) => void;
  folder?: Folder;
};

const FolderFormModal: React.FC<FolderFormModalProps> = ({
  saveFolder,
  folder,
}) => {
  const initialValues = {
    title: '',
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { values, errors, handleChange, handleSubmit } = useFormik<
    Partial<Folder>
  >({
    initialValues: folder || initialValues,
    validationSchema: saveFolderSchema,
    onSubmit: (values) => {
      console.log(values);
      saveFolder(values);
      onClose();
    },
  });
  return (
    <>
      <Button onClick={onOpen}>{folder ? 'Edit Folder' : 'New Folder'}</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {folder ? 'Edit the Folder' : 'Create new folder'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                name="title"
                type="text"
                onChange={handleChange}
                value={values.title}
              />
              {errors.title && <div>{errors.title}</div>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleSubmit()}>
              {folder ? 'Update' : 'Create'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FolderFormModal;
