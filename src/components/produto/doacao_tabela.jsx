import { useState, useEffect } from "react";
import { AdicionarDoacao } from "./registrar_doacao";
import { RegistrarCategoria } from "./categoria";
import { RegistrarFamilia } from "./familia";
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

import { ExcluirDoacaoModal } from "./excluir_doacao";
   

const TABLE_HEAD = ["Doador", "Produto Id", "Produto", "Deletar"];
   
  
   
export function Doacoes() {
    const [doacao, setDoacao ] = useState([])

    useEffect(() => {
      try {
        getDoacao()
      } catch (error) {
        const messageError = error.message
        toast.error(messageError)
      }

    }, [])

    async function getDoacao() {
      try {
        const apiUrl = 'https://localhost:7196/api/Doacao/buscartodos';
        const resposta = await axios.get(apiUrl);
  
        setDoacao(resposta.data)

      } catch (err) {
        const messageError = err.message;
        toast.error({messageError});
      }
    }


    return (
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de Doações
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Todos as doações cadastradas devem ter seu doador verificado e cadastrado devidamente.
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

              <RegistrarCategoria  className="flex items-center gap-3" size="sm"/>
              <RegistrarFamilia className="flex items-center gap-3" size="sm"/>
              <AdicionarDoacao className="flex items-center gap-3" size="sm"/>

            
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <div className="w-full md:w-72">
              <Input
                label = "Pesquisar"
                type = "search"
                icon = {<MagnifyingGlassIcon className="h-5 w-5" />
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
              {doacao.map(
                (doacao, index) => {
     
                  return (
                    <tr key={doacao.doacao.doacaO_ID}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {doacao.colaborador.nome} {doacao.colaborador.sobrenome}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                             {doacao.produto.produtO_ID}
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
                             {doacao.produto.produtO_DESC}
                          </Typography>
                        </div>
                      </td>
                      <td>
                        <ExcluirDoacaoModal id={doacao.doacao.doacaO_ID}/>
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