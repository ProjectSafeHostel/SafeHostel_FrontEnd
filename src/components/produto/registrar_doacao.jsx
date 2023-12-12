import { useState, useEffect } from "react";
import Select from "react-select"
import axios from "axios";
import { toast } from "react-toastify";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

export function AdicionarDoacao() {
  const [open, setOpen] = useState(false);
  const [doador, setDoador] = useState([])
  const [idDoador, setIdDoador] = useState(0)
  const [familia, setFamilia] = useState([])
  const [idFamilia, setIdFamilia] = useState(0)


  useEffect(() => {
    try {
      getDoador()
    } catch (error) {
      const messageError = error.message
      toast.error(messageError)
    }
  }, [])

  useEffect(() => {
    try {
      getFamilia()
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


  async function getFamilia() {
    try {
      const apiUrl = 'https://localhost:7196/api/ProdutoFamilia/buscartodos';
      const resposta = await axios.get(apiUrl);

      setFamilia(resposta.data)

    } catch (err) {
      const messageError = err.message;
      toast.error({ messageError });
    }
  }

  const [novoProduto, setNovoProduto] = useState({
    PRODUTO_DESC: "",
    FAMILIA: 0,
    PRODUTO_VALOR: 0,
    PERECIVEL_FLAG: 0, // 0 - ATIVO, 1 - DESATIVO
    PESO_ITEM: 0,
  });

          
  const handleOpen = () => setOpen((cur) => !cur);

  const handleNovoProduto = (field, value) => {
    setNovoProduto((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
          
  const handleSelectDoador = (selected) => {
    setIdDoador(selected.value)
  }

  const handleSelectFamilia = (selected) => {
    setIdFamilia(selected.value)
  }

  const RegistrarDoacao = async () => {
    console.log("Doacao id {0}", idDoador)
    const doadorId = idDoador;
    const familiaId = idFamilia;

    try {
      const resposta = await axios.post('https://localhost:7196/api/Doacao/adicionar', {
        DOADOR_ID: doadorId,
        Produto: {
          produtO_DESC: novoProduto.PRODUTO_DESC,
          produtO_FAMILIA_ID: familiaId,
          produtO_VALOR: novoProduto.PRODUTO_VALOR,
          pereciveL_FLAG: novoProduto.PERECIVEL_FLAG,
          pesO_ITEM: novoProduto.PESO_ITEM
        }
      });
  
      if (resposta.status === 200){
        toast.success("Doação cadastrada com sucesso!")
      }
      } catch (erro) {
        console.error('Erro ao cadastradar doação:', erro.message);
      }
      setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Adicionar Doação</Button>
      <form>
        <Dialog
          size="xs"
          open={open}
          required
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-4xl max-h-full text-justify p-6 text-blue-800">
            <CardHeader>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">

            <Typography className="-mb-2" variant="h6">
                Descrição do Produto
              </Typography>
              <Input
                label="Descrição do Produto"
                size="lg"
                required
                value={novoProduto.PRODUTO_DESC}
                onChange={(e) => handleNovoProduto("PRODUTO_DESC", e.target.value)}
              />

              <Typography className="-mb-2" variant="h6">
                Família do Produto
              </Typography>
              <Select
                label="Família do Produto"
                size="lg"
                required
                options={familia.map(familia => (
                  {
                    value: familia.produtO_FAMILIA_ID,
                    label: familia.familia
                  }
                ))}
                onChange={handleSelectFamilia}
              />

              <Typography className="-mb-2" variant="h6">
                Valor do Produto
              </Typography>
              <Input
                label="Valor do Produto"
                size="lg"
                required
                value={novoProduto.PRODUTO_VALOR}
                onChange={(e) => handleNovoProduto("PRODUTO_VALOR", e.target.value)}
              />
              <Typography className="-mb-2" variant="h6">
                Perecível
              </Typography>
              <Input
                label="Perecível (0 - Ativo, 1 - Desativo)"
                size="lg"
                required
                value={novoProduto.PERECIVEL_FLAG}
                onChange={(e) => handleNovoProduto("PERECIVEL_FLAG", e.target.value)}
              />
              <Typography className="-mb-2" variant="h6">
                Peso do Item
              </Typography>
              <Input
                label="Peso do Item"
                size="lg"
                required
                value={novoProduto.PESO_ITEM}
                onChange={(e) => handleNovoProduto("PESO_ITEM", e.target.value)}
              />

              <Typography className="-mb-2" variant="h6">
                Doador à doar
              </Typography>
              <Select
                label="Doador"
                size="lg"
                required
                options={doador.map(doador => (
                  {
                    value: doador.doador.doadoR_ID,
                    label: `${doador.colaborador.nome}  ${doador.colaborador.sobrenome}`
                  }
                ))}
                onChange={handleSelectDoador}
              />

            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                variant="gradient"
                onClick={RegistrarDoacao}
                fullWidth
              >
                Adicionar
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </form>
    </>
  );
}
