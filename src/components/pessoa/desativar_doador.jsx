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

export function ExcluirDaodorModal({ id }) {
  const [open, setOpen] = useState(false);
  const doadorID = id;

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleExcluirDoador = async () => {
    try {
      console.log("ID Cliente: " + doadorID);
      const apiUrl = `https://localhost:7196/api/Doador/excluir/${doadorID}`;
      const resposta = await axios.delete(apiUrl);

      if (resposta.status === 200) {
        toast.success("Doador excluído com sucesso!");
      }
    } catch (err) {
      const messageError = err.message;
      toast.error({ messageError });
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
          <CardHeader>Excluir Doador</CardHeader>
          <CardBody>
            <p>Tem certeza que deseja excluir este cliente?</p>
            <p>Esta ação é irreversível.</p>
          </CardBody>
          <CardFooter className="inline-flex py-3 space-x-3">
            <Button
              type="button"
              variant="filled"
              onClick={handleExcluirDoador}
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