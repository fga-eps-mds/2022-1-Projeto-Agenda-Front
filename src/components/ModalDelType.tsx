import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { listcategory } from '@services/testApi';

interface DelCategoryProps {
  id: number;
  name: string;
  callBackDel: (Delid: number) => void;
}

export const ModalDelType = ({
  id,
  name,
  callBackDel,
}: DelCategoryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function DeleteType() {
    const del = {
      active: false,
    };
    listcategory
      .patch('/users/' + id, del) //O caminho deve ser alterado para a api do back.
      .then(() => {
        toast.success(
          'O tipo ' + name + ' foi desativado',
          {
            position: 'top-left',
            autoClose: 2000,
          }
        );
        callBackDel(id);
      })
      .catch(() => {
        toast.warning(
          'Falha ao desativar tipo de problema!',
          {
            position: 'top-left',
            autoClose: 2000,
          }
        );
      });
  }

  return (
    <>
      <Box fontFamily={'Overpass ,sans-serif'}>
        <Box
          m='0 auto'
          mt='1em'
          maxH={'20px'}
          fontSize={'xl'}
          onClick={onOpen}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- its necessary since _hover NEEDS a css style object
          _hover={{ boxShadow: 'dark-lg' }}
        >
          <RiDeleteBin6Line />
        </Box>

        <Modal
          size={'2xl'}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay
            backdropFilter={'auto'}
            backdropBlur={'2px'}
          />
          <ModalContent>
            <ModalHeader
              fontSize='3xl'
              fontWeight='bold'
              m={'0 auto'}
              fontFamily={'Overpass ,sans-serif'}
            >
              Remover Tipo de Problema
            </ModalHeader>

            <ModalBody>
              <Text
                w='60%'
                m={'0 auto'}
                textAlign={'justify'}
                fontSize={'md'}
                fontFamily={'Overpass ,sans-serif'}
              >
                Você está prestes a remover o tipo de
                problema
                {' ' + name + ' '}. Tem certeza disso?
              </Text>
            </ModalBody>

            <ModalFooter
              fontFamily={'Overpass ,sans-serif'}
              justifyContent={'center'}
              mt={'30px'}
            >
              <Button
                colorScheme='green'
                bg={'#22A122'}
                onClick={onClose}
                fontSize={'md'}
                borderRadius={'50px'}
                maxH={'35px'}
                w={'190px'}
              >
                CANCELAR
              </Button>
              <Button
                colorScheme='red'
                bg={'#DE4040'}
                onClick={DeleteType}
                ml={5}
                fontSize={'18px'}
                borderRadius={'50px'}
                maxH={'35px'}
                w={'250px'}
              >
                SIM, TENHO CERTEZA
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
