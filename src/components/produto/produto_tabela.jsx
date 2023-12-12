import { useState, useEffect } from "react";
import { RegistrarCategoria } from "./categoria";
import { AdicionarProduto } from "./registrar_produto";
import { RegistrarFamilia } from "./familia";
import { ExcluirProdutoModal } from "./excluir_produto";
import axios from "axios";
import { toast } from "react-toastify";

import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody
} from "@material-tailwind/react";


const TABLE_HEAD = ["Produto", "Familia", "Perecivel", "Peso", "Valor", "Excluir"];



export function Produtos() {
  const [produto, setProduto] = useState([])

  useEffect(() => {
    try {
      getProduto()
    } catch (error) {
      const messageError = error.message
      toast.error(messageError)
    }

  }, [])

  async function getProduto() {
    try {
      const apiUrl = 'https://localhost:7196/api/Produto/buscartodos';
      const resposta = await axios.get(apiUrl);

      setProduto(resposta.data)

    } catch (err) {
      const messageError = err.message;
      toast.error({ messageError });
    }
  }


  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de Produtos
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Todos os produtos cadastrados devem ter verificado a data de validade
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

            <RegistrarCategoria className="flex items-center gap-3" size="sm" />

            <RegistrarFamilia className="flex items-center gap-3" size="sm" />

            <AdicionarProduto variant="outlined" size="sm">
              <handleAdicionarProduto />;
            </AdicionarProduto>

          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <div className="w-full md:w-72">
            <Input
              label="Pesquisar"
              type="search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />
              }
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
            {produto.map((item) => {
              return (
                <tr key={item.produtO_ID}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col ml-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.produtO_DESC}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {item.produtO_FAMILIA_ID}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.pereciveL_FLAG == 0 ? "Perecível" : "Não perecível"}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.pesO_ITEM} Kg
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        R${item.produtO_VALOR}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <ExcluirProdutoModal id={item.produtO_ID} />
                  </td>
                </tr>
              );
            },
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}