import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import {
  Button,
  HStack,
  Skeleton,
  Tag,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { AxiosResponse } from "axios"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { CategoriaForm as ProblemTypeForm } from "@components/Forms/CategoriaForm"
import { List } from "@components/List"
import { ListItem } from "@components/ListItem"
import { Modal } from "@components/Modal/Modal"
import { PageHeader } from "@components/PageHeader"
import { RefreshButton } from "@components/RefreshButton"
import { ApiData, useRequest } from "@hooks/useRequest"
import { detalhadorApi } from "@services/api"
import { getProblemCategory } from "@services/DetalhadorChamado/Categoria"
import {
  createProblemType,
  deleteProblemType,
  getProblemTypes,
  updateProblemType
} from "@services/DetalhadorChamado/Problemas"
import { request } from "@services/request"

const ListaProblemas = () => {
  const router = useRouter()

  const category_id = Number(router.query?.id)

  const { data: categoria, isLoading: isLoadingCategory } =
    useRequest<IProblemCategory>(
      category_id ? getProblemCategory(category_id) : null,
      detalhadorApi
    )

  const {
    data: problemas,
    isLoading,
    isValidating,
    mutate
  } = useRequest<ProblemType[]>(getProblemTypes(category_id), detalhadorApi)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [problemToEdit, setProblemToEdit] = useState<ProblemType>()

  const handleDelete = useCallback(
    async ({ id }: ProblemType) => {
      const response = await request(deleteProblemType(id), detalhadorApi)

      if (response.type === "success") {
        toast.success("Tipo de problema deletado com sucesso!")

        const newProblemas = problemas?.data.filter(
          (problema) => problema.id !== id
        )

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newProblemas || ([] as ProblemType[])
            }
          } as AxiosResponse<ApiData<ProblemType[]>>,
          { revalidate: false }
        )

        return
      }

      toast.error("Erro ao deletar Tipo de Problema!")
    },
    [problemas?.data, mutate]
  )

  const handleEdit = useCallback(
    (categoria: ProblemType) => {
      setProblemToEdit(categoria)
      onOpen()
    },
    [onOpen]
  )

  const onSubmit = useCallback(
    async (data: ProblemTypePayload) => {
      console.log("DATA: ", data)

      const response = await request<{ data: ProblemType }>(
        problemToEdit
          ? updateProblemType(problemToEdit.id)(data)
          : createProblemType({ ...data, category_id }),
        detalhadorApi
      )

      if (response.type === "success") {
        toast.success(
          `Tipo de Problema ${
            problemToEdit ? "editado" : "criado"
          } com sucesso!`
        )

        const newProblemas = problemToEdit
          ? problemas?.data.map((problema) =>
              problema.id === problemToEdit?.id ? response.value.data : problema
            )
          : [...(problemas?.data || []), response.value.data]

        mutate(
          {
            data: {
              error: null,
              message: "",
              data: newProblemas
            }
          } as AxiosResponse<ApiData<ProblemType[]>>,
          { revalidate: false }
        )

        setProblemToEdit(undefined)
        onClose()

        return
      }

      toast.error("Erro ao criar Tipo de Problema!")
    },
    [problemToEdit, category_id, problemas?.data, mutate, onClose]
  )

  const handleClose = useCallback(() => {
    setProblemToEdit(undefined)
    onClose()
  }, [onClose])

  return (
    <>
      <PageHeader
        title="Gerenciar Tipos de Problema"
        subtitle={
          <Skeleton
            h="16px"
            isLoaded={Boolean(!isLoadingCategory && category_id)}
          >
            <Text color="GrayText">
              Da Categoria{" "}
              <Tag colorScheme="yellow" fontWeight="semibold" fontSize="md">
                {categoria?.data?.name}
              </Tag>
            </Text>
          </Skeleton>
        }
      >
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          <Button onClick={onOpen}>Novo Tipo de Problema</Button>
        </HStack>
      </PageHeader>

      <List<ProblemType> isLoading={isLoading || isValidating}>
        {problemas?.data?.map?.((item, key) => (
          <ListItem
            title={item?.name}
            description={item?.description}
            key={key}
          >
            <ListItem.Actions item={item}>
              <EditButton onClick={handleEdit} label={item.name} />
              <DeleteButton onClick={handleDelete} label={item.name} />
            </ListItem.Actions>
          </ListItem>
        ))}
      </List>

      <Modal
        title={
          problemToEdit ? "Editar Tipo de Problema" : "Novo Tipo de Problema"
        }
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ProblemTypeForm
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop -- ignore
          defaultValues={{ ...problemToEdit, category_id } as ProblemType}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  )
}

export default ListaProblemas
