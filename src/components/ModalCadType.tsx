import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { listcategory } from '@services/testApi';

import { Data1 } from './DataType';

interface ModalCadTypeProps {
  callBack: (novaCategoria: Data1) => void;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const ModalCadType = ({
  callBack,
  onOpen,
  onClose,
  isOpen,
}: ModalCadTypeProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: {},
  } = useForm<Data1>();

  const onSubmit: SubmitHandler<Data1> = async (data) => {
    listcategory
      .post('/users', data)
      .then(() => {
        toast.success(
          'A categoria ' + data.name + ' foi cadastrada',
          {
            position: 'top-left',
            autoClose: 2000,
          }
        );
        callBack(data);
        reset();
      })
      .catch(() => {
        toast.warning('Falha ao criar categoria', {
          position: 'top-left',
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      <Box fontFamily={'Overpass ,sans-serif'}>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={'xl'}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              textAlign={'center'}
              fontSize={'3xl'}
              fontFamily={'Overpass ,sans-serif'}
            >
              Nova Categoria de Problema
            </ModalHeader>

            <ModalBody fontFamily={'Overpass ,sans-serif'}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box w={'50%'} m={'0 auto'}>
                  <FormControl isRequired>
                    <FormLabel>Nome</FormLabel>
                    <Input
                      borderRadius={'8px'}
                      size={'sm'}
                      placeholder='Nome'
                      {...register('name')}
                    />
                  </FormControl>

                  <FormControl mt={'24px'}>
                    <FormLabel>Descrição</FormLabel>
                    <Input
                      borderRadius={'8px'}
                      size={'sm'}
                      placeholder='Descrição'
                      {...register('description')}
                    />
                  </FormControl>
                </Box>

                <ModalFooter
                  justifyContent={'center'}
                  mt={'60px'}
                >
                  <Button
                    variant={'solid'}
                    bg='InfoBackground'
                    color='black'
                    mr={'30px'}
                    onClick={onClose}
                    border={'1px'}
                    borderColor={'black'}
                    borderRadius={'50px'}
                    fontSize={'medium'}
                  >
                    Cancelar
                  </Button>
                  <Button
                    colorScheme={'orange'}
                    bg='primary'
                    color={'white'}
                    type='submit'
                    borderRadius={'50px'}
                    boxShadow={'dark-lg'}
                  >
                    <Text fontSize={'smaller'}>
                      REGISTRAR CATEGORIA DE<p></p> PROBLEMA
                    </Text>
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
