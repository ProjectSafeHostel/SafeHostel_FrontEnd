import { useState } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
 
export function RegistrarCategoria() {
  const [open, setOpen] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("")


  const handleOpen = () => setOpen((cur) => !cur);

  const handleRegistrarCategoria  = async (e) => {
    e.preventDefault();

    try {
      console.log("Entrou api post categoria")

      const resposta = await axios.post(
        'https://localhost:7196/api/ProdutoCategoria/adicionar', {
          DESCRICAO: novaCategoria,
        });

        if (resposta.status === 200){
          toast.success("Categoria cadastrada com sucesso!")
        }
    } catch (erro) {
      console.error('Erro ao cadastradar categoria:', erro.message);
    }
    setOpen(false);
  }
  
  return (
    <>
      <Button onClick={handleOpen}>Registrar Categoria</Button>
      <form>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Categoria
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Digite as informações para registrar uma categoria
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Nome da Categoria
              </Typography>
              <Input
                label="Categoria"
                size="lg"
                required
                maxLength={30}
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
              />
            </CardBody>

            <CardFooter className="pt-0">
              <Button
                type="button"
                variant="filled"
                fullWidth
                onClick={handleRegistrarCategoria}
              >
                Registrar
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </form>
    </>
  );
  }