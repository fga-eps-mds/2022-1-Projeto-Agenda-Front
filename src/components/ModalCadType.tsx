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

import { typeApi } from '@services/testApi';

import { DataProbType } from './DataType';

interface ModalCadTypeProps {
  callBack?: (novoTipo: DataProbType) => void;
  categoryId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCadType = ({
  categoryId,
  callBack,
  onClose,
  isOpen,
}: ModalCadTypeProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: {},
  } = useForm<DataProbType>();

  const onSubmit: SubmitHandler<DataProbType> = async (
    data
  ) => {
    data.category_id = categoryId;
    data.active = true;
    typeApi
      .post('/users', data)
      .then(() => {
        toast.success(
          'O tipo ' +
            data.name +
            ' foi cadastrado com sucesso',
          {
            position: 'top-left',
            autoClose: 2000,
          }
        );

        if (callBack !== undefined) {
          callBack(data);
        }

        reset();
      })
      .catch((error) => {
        toast.warning('Falha ao criar tipo de problema', {
          position: 'top-left',
          autoClose: 2000,
        });
        console.log(error);
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
          <ModalOverlay
            backdropFilter={'auto'}
            backdropBlur={'2px'}
          />
          <ModalContent>
            <ModalHeader
              textAlign={'center'}
              fontSize={'3xl'}
              fontFamily={'Overpass ,sans-serif'}
            >
              Novo Tipo de Problema
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
                      REGISTRAR TIPO DE<p></p> PROBLEMA
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