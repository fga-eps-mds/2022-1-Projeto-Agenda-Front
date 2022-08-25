import { IconType } from "react-icons"
import { FaUsersCog } from "react-icons/fa"
import { FiLayout } from "react-icons/fi"
import { MdOutlineLocationCity, MdOutlineViewAgenda } from "react-icons/md"

export interface IRoute {
  label: string
  pathname: string
  icon?: IconType
}

export const routes: IRoute[] = [
  //   {
  //     label: 'Dashboard',
  //     pathname: '/dashboard',
  //     icon: MdOutlineDashboard,
  //   },
  {
    label: "Chamados",
    pathname: "/chamados",
    icon: MdOutlineViewAgenda
  },
  //   {
  //     label: 'Registrar Chamado',
  //     pathname: 'chamados/registrar',
  //     icon: MdOutlineCallToAction,
  //   },
  {
    label: "Categorias de Problema",
    pathname: "/categorias",
    icon: FiLayout
  },
  {
    label: "Cidades",
    pathname: "/cidades",
    icon: MdOutlineLocationCity
  },
  //   {
  //     label: "Postos de Trabalho",
  //     pathname: "/workstation",
  //     icon: FiMapPin
  //   },
  {
    label: "Usuários",
    pathname: "/usuarios",
    icon: FaUsersCog
  }
]
