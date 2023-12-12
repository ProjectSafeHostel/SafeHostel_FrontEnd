import { useState, useEffect } from "react";
import { RegistrarDoador } from "./registrar_doador";
import { ExcluirDaodorModal } from "./desativar_doador";
import axios from 'axios';
import { toast } from "react-toastify";

import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody
} from "@material-tailwind/react";
import { format, parseISO } from "date-fns";


const TABLE_HEAD = ["Doador", "CPF/CNPJ", "Data de Nascimento", "Desativar"];

export function Doadores() {
  const [doador, setDoador] = useState([])

  useEffect(() => {
    try {
      getDoador()
    } catch (error) {
      const messageError = error.message
      toast.error(messageError)
    }
  }, [])

  async function getDoador() {
    try {
      const apiUrl = 'https://localhost:7196/api/Doador/buscartodos';
      const resposta = await axios.get(apiUrl);

      setDoador(resposta.data)

    } catch (err) {
      const messageError = err.message;
      toast.error({ messageError });
    }
  }

  const formatarData = (data) => {
    const dataFormatada = parseISO(data);
    return format(dataFormatada, 'dd/MM/yyyy');
  };


  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de Doadores
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <RegistrarDoador variant="outlined" size="sm" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Pesquisar"
              type="search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doador.map((item) => (
              <tr key={item.doador.doadoR_ID}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {`${item.colaborador.nome} ${item.colaborador.sobrenome}`}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.colaborador.cpf.trim() ? item.colaborador.cpf : item.doador.cnpj}
                    </Typography>
                  </div>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.colaborador.datA_NASCIMENTO == null || "" ? "Não possui" : formatarData(item.colaborador.datA_NASCIMENTO)}
                  </Typography>
                </td>
                <td className="p-4">
                  <ExcluirDaodorModal id={item.doador.doadoR_ID} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}