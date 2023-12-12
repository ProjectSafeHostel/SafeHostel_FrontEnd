import { useState } from "react";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";

import axios from "axios";
import { toast } from "react-toastify";

export function RegistrarCliente() {
  const [open, setOpen] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    NOME: "",
    FOTO: "",
  });

  const handleOpen = () => setOpen((cur) => !cur);

  const handleInputChange = (field, value) => {
    setNovoCliente((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleRegistrarCliente = async () => {
    try {
      const resposta = await axios.post('https://localhost:7196/api/Cliente/adicionar', {
        nome: novoCliente.NOME,
        foto: novoCliente.FOTO
      });

      if(resposta.status == 200){
        toast.success("Cliente cadastrado com sucesso!")
      }
    } catch (erro) {
      toast.error('Erro ao cadastrar cliente:', erro.message);
    }
    setOpen(false);
  }


  return (
    <>
      <Button onClick={handleOpen}>Adicionar Cliente</Button>
      <form>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-4xl max-h-full text-justify p-6 text-blue-800">
          <CardHeader>Informações do Cliente</CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <Input
                  label="Nome"
                  size="lg"
                  required = "true"
                  maxLength={20}
                  value={novoCliente.NOME}
                  onChange={(e) => handleInputChange("NOME", e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <Input
                  label="Foto"
                  // type="file"
                  size="lg"
                  value={novoCliente.FOTO}
                  onChange={(e) => handleInputChange("FOTO", e.target.value)}
                />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              variant="gradient"
              onClick={handleRegistrarCliente}
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
