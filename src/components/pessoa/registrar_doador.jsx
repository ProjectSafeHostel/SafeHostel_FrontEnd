import { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { toast } from "react-toastify";


export function RegistrarDoador() {
  const [open, setOpen] = useState(false);
  const [novoDoador, setNovoDoador] = useState({
    nome: "",
    sobrenome: "",
    documento: "",
    isCPF: true,
    DATA_NASCIMENTO: "",
  });

  const [novoEndereco, setNovoEndereco] = useState({
    logradouro: "",
    numero: "",
    complemento: "",
    cidade: "",
    cep: "",
  });


  const handleOpen = () => setOpen((cur) => !cur);

  const handleInputChange = (field, value) => {
    setNovoDoador((prev) => ({
      ...prev,
      [field]: value,
    }));
    setNovoEndereco((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleSwitchChange = () => {
    setNovoDoador((prev) => ({
      ...prev,
      isCPF: !prev.isCPF,
      dataDeNascimento: "", // Limpar idade ao trocar entre CPF e CNPJ
    }));
  };

  const handleRegistrarDoador = async () => {
    console.log("data nascimento", novoDoador.DATA_NASCIMENTO)
    const dataNascimentoFormatada = new Date(novoDoador.DATA_NASCIMENTO)

    console.log("data nascimento formatada", dataNascimentoFormatada)

    try {
      const resposta = await axios.post('https://localhost:7196/api/Doador/adicionar', {
        Doador: {
          cpf: novoDoador.documento.length == 11 ? novoDoador.documento : "",
          cnpj: novoDoador.documento.length == 14 ? novoDoador.documento : "",
        },
        Colaborador: {
          nome: novoDoador.nome,
          sobrenome: novoDoador.sobrenome,
          cpf: novoDoador.documento,
          DATA_NASCIMENTO: dataNascimentoFormatada
        },
        Endereco: {
          logradouro: novoEndereco.logradouro,
          numero: novoEndereco.numero,
          complemento: novoEndereco.complemento,
          cidade: novoEndereco.cidade,
          cep: novoEndereco.cep
        }
      });

      if (resposta.status === 200) {
        toast.success("Doador cadastrado com sucesso!")
      }
    } catch (erro) {
      toast.error('Erro ao cadastrar doador:', erro.message);
    }
    setOpen(false);
  }

  return (
    <>
      <Button onClick={handleOpen}>Adicionar Doador</Button>
      <form>
        <Dialog
          size="xl"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-4xl max-h-full text-justify p-6 text-blue-800">
            <CardHeader>Informações do Doador</CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-1/2 flex">
                  <Input
                    label="Nome"
                    size="lg"
                    required
                    maxLength={20}
                    value={novoDoador.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                  />
                </div>
                <div className="w-1/2 flex">
                  <Input
                    label="Sobrenome"
                    size="lg"
                    required
                    maxLength={120}
                    value={novoDoador.sobrenome}
                    onChange={(e) => handleInputChange("sobrenome", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 flex">
                  <div className="gap-2 inline-flex">
                    <Select
                      value={novoDoador.isCPF ? "CPF" : "CNPJ"}
                      onChange={() => handleSwitchChange()}
                    >
                      <Option value="CPF">CPF</Option>
                      <Option value="CNPJ">CNPJ</Option>
                    </Select>
                    <Input
                      label={novoDoador.isCPF ? "CPF" : "CNPJ"}
                      size="lg"
                      maxLength={novoDoador.isCPF ? 11 : 14}
                      required
                      value={novoDoador.documento}
                      onChange={(e) => handleInputChange("documento", e.target.value)}
                    />
                  </div>
                </div>
                {novoDoador.isCPF && (
                  <div className="w-1/2 flex">
                    <Input
                      label="Data de Nascimento"
                      size="lg"
                      type="date"
                      // required
                      value={novoDoador.DATA_NASCIMENTO}
                      onChange={(e) => handleInputChange("DATA_NASCIMENTO", e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 flex">
                  <Input
                    label="Logradouro"
                    size="lg"
                    type="text"
                    required
                    maxLength={60}
                    value={novoEndereco.logradouro}
                    onChange={(e) => handleInputChange("logradouro", e.target.value)}
                  />
                </div>
                <div className="w-1/2 flex">
                  <Input
                    label="Número"
                    maxLength={7}
                    size="lg"
                    required
                    value={novoEndereco.numero}
                    onChange={(e) => handleInputChange("numero", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 flex">
                  <Input
                    label="Complemento"
                    size="lg"
                    maxLength={50}
                    value={novoEndereco.complemento}
                    onChange={(e) => handleInputChange("complemento", e.target.value)}
                  />
                </div>
                <div className="w-1/2 flex">
                  <Input
                    label="Cidade"
                    size="lg"
                    maxLength={20}
                    required
                    value={novoEndereco.cidade}
                    onChange={(e) => handleInputChange("cidade", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 flex">
                  <Input
                    label="CEP"
                    size="lg"
                    maxLength={8}
                    value={novoEndereco.cep}
                    onChange={(e) => handleInputChange("cep", e.target.value)}
                  />
                </div>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                variant="gradient"
                onClick={handleRegistrarDoador}
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
