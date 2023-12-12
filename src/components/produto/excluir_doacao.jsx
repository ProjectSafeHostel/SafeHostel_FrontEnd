import { useState } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

export function ExcluirDoacaoModal({ id }) {
  const [open, setOpen] = useState(false);
  const doacaoID = id;

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleExcluirDoacao = async () => {
    try {
      console.log("ID Cliente: " + doacaoID);
      const apiUrl = `https://localhost:7196/api/Doacao/excluir/${doacaoID}`;
      const resposta = await axios.delete(apiUrl);

      if (resposta.status === 200) {
        toast.success("Doação excluída com sucesso!");
      }
    } catch (err) {
      const messageError = err.message;
      toast.error(`Erro ao excluir doação: ${messageError}`);
    }

    handleCloseModal();
  };

  return (
    <>
      <Button onClick={handleOpenModal} className="bg-transparents"> 
        <XMarkIcon className="h-4 w-4" color="black"/> 
      </Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpenModal}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-4xl max-h-full text-justify p-6 text-blue-800">
          <CardHeader>Excluir Doação</CardHeader>
          <CardBody>
            <p>Tem certeza que deseja excluir esta doação?</p>
            <p>Esta ação é irreversível.</p>
          </CardBody>
          <CardFooter className="inline-flex py-3 space-x-3">
            <Button
              type="button"
              variant="filled"
              onClick={handleExcluirDoacao}
              fullWidth
            >
              Sim
            </Button>
            <Button
              type="button"
              variant="filled"
              onClick={handleCloseModal}
              fullWidth
            >
              Não
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}