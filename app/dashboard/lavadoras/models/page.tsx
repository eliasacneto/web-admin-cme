"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Loader from "@/components/loader";
interface Washer {
  id: number;
  marcaLavadora: string;
  modeloLavadora: string;
  volumeTotalCamaraLt: number;
  capacidadeCargaBandejasInstrumentos: number;
  capacidadeCargaTraqueias: number;
  tempMedCicloInstrumentosCargaMaxMin: number;
  tempMedCicloAssisVentCargaMaxMin: number;
  numBandejasPorUe: number;
  capacidadeProcessamUeCargaInstrumentos: number;
  intervaloMedEntreCiclos: number;
  qtdTraqueiasCirurgia: number;
  qtdTraqueiasLeitoUtiDia: number;
  quantidadeTermosProjeto: number;
  preco: number;
}

interface WasherBrand {
  id: number;
  nomeMarca: string;
  modeloLavadora: string;
  lavadoras: Washer[];
}

const WasherModelos = () => {
  const { toast } = useToast(); // Ajuste para o seu pacote de toast
  const [washerInfo, setWasherInfo] = useState<Washer>();
  const [washerModel, setWasherModel] = useState<WasherBrand[]>([]);
  const [newWasherModel, setNewWasherModel] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  const getInfo = async (id: number) => {
    try {
      const responseA = await axios.get<Washer>(
        `http://localhost:8000/washerModel/${id}`
      );
      setWasherInfo(responseA.data);
    } catch (e) {
      console.error("Erro ao buscar modelos:", e);
      toast({
        variant: "destructive",
        title: "Erro ao obter modelos!",
        description: "Ocorreu um erro ao obter os modelos.",
      });
    }
  };

  const getWasherModel = async () => {
    setLoading(true);
    try {
      const response = await axios.get<WasherBrand[]>(
        "http://localhost:8000/washerModel/by-brands"
      );
      setWasherModel(response.data);
    } catch (e) {
      console.error("Erro ao buscar modelos:", e);
      toast({
        variant: "destructive",
        title: "Erro ao buscar modelos!",
        description: "Ocorreu um erro ao buscar os modelos.",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (selectedBrandId === null) {
      toast({
        variant: "destructive",
        title: "Erro ao adicionar modelo!",
        description: "Selecione uma marca.",
      });
      return;
    }

    const body = {
      id: washerModel.length + 1,
      marcaLavadora: selectedBrandId,
      modeloLavadora: formData.get("modeloLavadora") as string,
      volumeTotalCamaraLt: Number(formData.get("volumeTotalCamaraLt")),
      capacidadeCargaBandejasInstrumentos: Number(
        formData.get("capacidadeCargaBandejasInstrumentos")
      ),

      medTotTempoCicapacidadeCargaTraqueiascloATMin: Number(
        formData.get("capacidadeCargaTraqueias")
      ),
      tempMedCicloInstrumentosCargaMaxMin: Number(
        formData.get("tempMedCicloInstrumentosCargaMaxMin")
      ),
      tempMedCicloAssisVentCargaMaxMin: Number(
        formData.get("tempMedCicloAssisVentCargaMaxMin")
      ),
      numBandejasPorUe: 0,
      capacidadeProcessamUeCargaInstrumentos: 0,
      intervaloMedEntreCiclos: 0,
      qtdTraqueiasCirurgia: 0,
      qtdTraqueiasLeitoUtiDia: 0,
      quantidadeTermosProjeto: 0,
      capacidadeCargaTraqueias: 0,

      preco: Number(formData.get("preco")),
    };

    try {
      await axios.post("http://localhost:8000/washerModel", body);
      console.log(body);
      toast({
        variant: "default",
        title: "Modelo adicionado com sucesso!",
      });
      getWasherModel();
      setNewWasherModel("");
    } catch (error) {
      console.log(body);
      console.error("Erro ao adicionar modelo:", error);
      toast({
        variant: "destructive",
        title: "Erro ao adicionar modelo!",
        description: "Ocorreu um erro ao adicionar o modelo.",
      });
    }
  };

  const updateWasherModel = async (
    id: number,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    getInfo(id);
    if (!washerInfo) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar!",
        description: "Informações da lavadora não disponíveis.",
      });
      return;
    }

    if (selectedBrandId === null) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar!",
        description: "Selecione uma marca.",
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const data = {
      marcaLavadora: selectedBrandId,
      modeloLavadora: formData.get("modeloLavadora") as string,
      volumeTotalCamaraLt: Number(formData.get("volumeTotalCamaraLt")),
      capacidadeCargaBandejasInstrumentos: Number(
        formData.get("capacidadeCargaBandejasInstrumentos")
      ),

      medTotTempoCicapacidadeCargaTraqueiascloATMin: Number(
        formData.get("medTotTempoCicapacidadeCargaTraqueiascloATMin")
      ),
      tempMedCicloInstrumentosCargaMaxMin: Number(
        formData.get("tempMedCicloInstrumentosCargaMaxMin")
      ),
      tempMedCicloAssisVentCargaMaxMin: Number(
        formData.get("tempMedCicloAssisVentCargaMaxMin")
      ),
      numBandejasPorUe: Number(formData.get("numBandejasPorUe")),
      capacidadeProcessamUeCargaInstrumentos: Number(
        formData.get("capacidadeProcessamUeCargaInstrumentos")
      ),
      intervaloMedEntreCiclos: Number(formData.get("intervaloMedEntreCiclos")),
      qtdTraqueiasCirurgia: Number(formData.get("qtdTraqueiasCirurgia")),
      qtdTraqueiasLeitoUtiDia: Number(formData.get("qtdTraqueiasLeitoUtiDia")),
      quantidadeTermosProjeto: Number(formData.get("quantidadeTermosProjeto")),
      capacidadeCargaTraqueias: Number(
        formData.get("capacidadeCargaTraqueias")
      ),

      preco: Number(formData.get("preco")),
    };

    try {
      await axios.put(
        `http://localhost:8000/washerModel/${washerInfo.id}`,
        data
      );
      console.log(selectedBrandId);
      getWasherModel();
      toast({
        variant: "default",
        title: "Modelo atualizado com sucesso!",
      });
    } catch (error) {
      console.log(data);
      console.error("Erro ao atualizar Modelo:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar!",
        description: "Ocorreu um erro ao atualizar o Modelo.",
      });
    }
  };

  const deleteWasherModel = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/washerModel/${id}`);
      toast({
        variant: "destructive",
        title: "Modelo removido com sucesso!",
      });
      getWasherModel();
    } catch (error) {
      console.error("Erro ao remover modelo:", error);
      toast({
        variant: "destructive",
        title: "Erro ao remover modelo!",
        description: "Ocorreu um erro ao remover o modelo.",
      });
    }
  };

  useEffect(() => {
    getWasherModel();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Produtos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/lavadoras/brands">
                Lavadoras
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Modelos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-between mt-10 mb-10">
        <div className="flex flex-col antialiased">
          <h3 className="font-bold text-2xl">Modelos de Lavadoras</h3>
          <p className="text-lg text-gray-400">
            Gerencie os modelos de Lavadoras disponíveis no seu estoque
          </p>
        </div>

        {/* Form to create a new autoclave model */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">+ Novo modelo</Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Novo modelo de lavadora</DialogTitle>
              <DialogDescription>
                Preencha os campos para cadastrar um novo modelo de lavadora
                termodesinfectora.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={saveData}>
              <div className="flex flex-col justify-start items-start gap-4 py-4">
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="marcaLavadora">Marca da Lavadora:</Label>
                    <Select
                      onValueChange={(value) =>
                        setSelectedBrandId(Number(value))
                      }
                    >
                      <SelectTrigger id="marcaLavadora">
                        <SelectValue placeholder="Selecione uma marca" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {washerModel.map((brand) => (
                          <SelectItem key={brand.id} value={String(brand.id)}>
                            {brand.nomeMarca}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="name" className="">
                      Nome do modelo:
                    </Label>
                    <Input
                      id="modeloLavadora"
                      name="modeloLavadora"
                      className="col-span-3"
                      value={newWasherModel}
                      onChange={(e) => setNewWasherModel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="volumeTotCamaraLt" className="">
                      Volume total da câmara (L):
                    </Label>
                    <Input
                      id="volumeTotCamaraLt"
                      name="volumeTotCamaraLt"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label
                      htmlFor="capacidadeCargaBandejasInstrumentos"
                      className=""
                    >
                      Capacidade de carga de bandejas de instrumentos (número de
                      bandejas):
                    </Label>
                    <Input
                      id="capacidadeCargaBandejasInstrumentos"
                      name="capacidadeCargaBandejasInstrumentos"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="capacidadeCargaTraqueias" className="">
                    Capacidade de carga traquéias (60cm + 120cm):
                  </Label>
                  <Input
                    id="capacidadeCargaTraqueias"
                    name="capacidadeCargaTraqueias"
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label
                      htmlFor="tempMedCicloInstrumentosCargaMaxMin"
                      className=""
                    >
                      Tempo médio em minutos do ciclo de instrumentos com carga
                      máxima:
                    </Label>
                    <Input
                      id="tempMedCicloInstrumentosCargaMaxMin"
                      name="tempMedCicloInstrumentosCargaMaxMin"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label
                      htmlFor="tempMedCicloAssisVentCargaMaxMin"
                      className=""
                    >
                      Tempo médio em minutos do ciclo de assistência
                      ventilatória com carga máxima:
                    </Label>
                    <Input
                      id="tempMedCicloAssisVentCargaMaxMin"
                      name="tempMedCicloAssisVentCargaMaxMin"
                      className="col-span-3"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="preco" className="">
                    Preço:
                  </Label>
                  <Input id="preco" name="preco" className="col-span-3" />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button type="submit" variant="primary">
                  Cadastrar Lavadora
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {washerModel &&
        washerModel.map((brand) => (
          <Accordion type="single" collapsible key={brand.id}>
            <AccordionItem value={`brand-${brand.id}`}>
              <AccordionTrigger className="text-xl font-bold rounded-md mt-2 bg-gray-100">
                <p className="text-slate-800 text-base ml-4">
                  <span className="text-[#859221]">Marca:</span>{" "}
                  {brand.nomeMarca}
                </p>
              </AccordionTrigger>
              <AccordionContent>
                {brand.lavadoras &&
                  brand.lavadoras.map((washer) => (
                    <Card className="w-full" key={washer.id}>
                      <div className="flex items-center justify-between m-5">
                        <div className="flex gap-5 items-center">
                          <h1 className="text-base font-semibold">
                            {washer.modeloLavadora}
                          </h1>
                        </div>
                        <div className="flex gap-3">
                          {/* See autoclave infos */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  getInfo(washer.id);
                                }}
                              >
                                <Eye size="18" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="">
                              <DialogHeader>
                                <DialogTitle>
                                  Autoclave:{" "}
                                  <span className="text-[#8c9a20]">
                                    {washerInfo?.modeloLavadora}
                                  </span>
                                </DialogTitle>

                                <DialogDescription></DialogDescription>
                              </DialogHeader>

                              <form>
                                <div className="flex flex-col justify-start items-start gap-4 py-4">
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label htmlFor="marcaAutoclave">
                                        Marca da Autoclave:
                                      </Label>
                                      <Input
                                        id="modeloAutoclave"
                                        name="modeloAutoclave"
                                        className="col-span-3"
                                        value={brand?.nomeMarca}
                                        readOnly
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label htmlFor="name" className="">
                                        Nome do modelo:
                                      </Label>
                                      <Input
                                        id="modeloLavadora"
                                        name="modeloLavadora"
                                        className="col-span-3"
                                        value={washerInfo?.modeloLavadora}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="volumeTotalCamaraLt"
                                        className=""
                                      >
                                        Volume total da câmara (L):
                                      </Label>
                                      <Input
                                        id="volumeTotalCamaraLt"
                                        name="volumeTotalCamaraLt"
                                        className="col-span-3"
                                        value={washerInfo?.volumeTotalCamaraLt}
                                        readOnly
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="capacidadeCargaBandejasInstrumentos"
                                        className=""
                                      >
                                        Capacidade de carga de bandejas de
                                        instrumentos (número de bandejas):
                                      </Label>
                                      <Input
                                        id="capacidadeCargaBandejasInstrumentos"
                                        name="capacidadeCargaBandejasInstrumentos"
                                        className="col-span-3"
                                        defaultValue={
                                          washerInfo?.capacidadeCargaBandejasInstrumentos
                                        }
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col w-full gap-2">
                                    <Label
                                      htmlFor="capacidadeCargaTraqueias"
                                      className=""
                                    >
                                      Capacidade de carga traquéias (60cm +
                                      120cm):
                                    </Label>
                                    <Input
                                      id="capacidadeCargaTraqueias"
                                      name="capacidadeCargaTraqueias"
                                      className="col-span-3"
                                      defaultValue={
                                        washerInfo?.capacidadeCargaTraqueias
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="tempMedCicloInstrumentosCargaMaxMin"
                                        className=""
                                      >
                                        Tempo médio em minutos do ciclo de
                                        instrumentos com carga máxima:{" "}
                                      </Label>
                                      <Input
                                        id="tempMedCicloInstrumentosCargaMaxMin"
                                        name="tempMedCicloInstrumentosCargaMaxMin"
                                        className="col-span-3"
                                        defaultValue={
                                          washerInfo?.tempMedCicloInstrumentosCargaMaxMin
                                        }
                                        readOnly
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="tempMedCicloAssisVentCargaMaxMin"
                                        className=""
                                      >
                                        Tempo médio em minutos do ciclo de
                                        assistência ventilatória com carga
                                        máxima:{" "}
                                      </Label>
                                      <Input
                                        id="tempMedCicloAssisVentCargaMaxMin"
                                        name="tempMedCicloAssisVentCargaMaxMin"
                                        className="col-span-3"
                                        defaultValue={
                                          washerInfo?.tempMedCicloAssisVentCargaMaxMin
                                        }
                                        readOnly
                                      />
                                    </div>
                                  </div>

                                  <div className="flex flex-col w-full gap-2">
                                    <Label
                                      htmlFor="tempoDiarioAquecimentoMaqMin"
                                      className=""
                                    >
                                      Tempo em minutos para procedimento diário
                                      de aquecimento máquina fria:
                                    </Label>
                                    <Input
                                      id="tempoDiarioAquecimentoMaqMin"
                                      name="tempoDiarioAquecimentoMaqMin"
                                      className="col-span-3"
                                      defaultValue={
                                        washerInfo?.tempMedCicloInstrumentosCargaMaxMin
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="flex flex-col w-full gap-2">
                                    <Label htmlFor="preco" className="">
                                      Preço:
                                    </Label>
                                    <Input
                                      id="preco"
                                      name="preco"
                                      className="col-span-3"
                                      defaultValue={washerInfo?.preco}
                                      readOnly
                                    />
                                  </div>
                                </div>

                                <DialogFooter>
                                  <Button variant="outline">Fechar</Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>

                          {/* Edit lavadora */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  getInfo(washer.id);
                                }}
                              >
                                <Edit2 size="18" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Editar Lavadora:{" "}
                                  <span className="text-[#8c9a20]">
                                    {washer.modeloLavadora}
                                  </span>
                                </DialogTitle>
                                <DialogDescription>
                                  Preencha os campos para editar a lavadora
                                  termodesinfectora selecionada
                                </DialogDescription>
                              </DialogHeader>
                              {washerInfo && (
                                <form
                                  onSubmit={(e) =>
                                    updateWasherModel(washer.id, e)
                                  }
                                >
                                  <div className="flex flex-col justify-start items-start gap-4 py-4">
                                    <div className="flex justify-between items-center gap-4 w-full">
                                      <div className="flex flex-col w-full gap-2">
                                        <Label htmlFor="marcaLavadora">
                                          Marca da Lavadora:
                                        </Label>
                                        <Select
                                          onValueChange={(value) =>
                                            setSelectedBrandId(Number(value))
                                          }
                                        >
                                          <SelectTrigger id="marcaLavadora">
                                            <SelectValue placeholder="Selecione uma marca" />
                                          </SelectTrigger>
                                          <SelectContent position="popper">
                                            {washerModel.map((brand) => (
                                              <SelectItem
                                                key={brand.id}
                                                value={String(brand.id)}
                                              >
                                                {brand.nomeMarca}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="flex flex-col w-full gap-2">
                                        <Label htmlFor="name" className="">
                                          Nome do modelo:
                                        </Label>
                                        <Input
                                          id="modeloLavadora"
                                          name="modeloLavadora"
                                          className="col-span-3"
                                          defaultValue={
                                            washerInfo?.modeloLavadora
                                          }
                                          onChange={(e) =>
                                            setNewWasherModel(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-between items-center gap-4 w-full">
                                      <div className="flex flex-col w-full gap-2">
                                        <Label
                                          htmlFor="volumeTotalCamaraLt"
                                          className=""
                                        >
                                          Volume total da câmara (L):
                                        </Label>
                                        <Input
                                          id="volumeTotalCamaraLt"
                                          name="volumeTotalCamaraLt"
                                          className="col-span-3"
                                          defaultValue={
                                            washerInfo?.volumeTotalCamaraLt
                                          }
                                          onChange={(e) =>
                                            setNewWasherModel(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="flex flex-col w-full gap-2">
                                        <Label
                                          htmlFor="capacidadeCargaBandejasInstrumentos"
                                          className=""
                                        >
                                          Capacidade de carga de bandejas de
                                          instrumentos (número de bandejas):
                                        </Label>
                                        <Input
                                          id="capacidadeCargaBandejasInstrumentos"
                                          name="capacidadeCargaBandejasInstrumentos"
                                          className="col-span-3"
                                          defaultValue={
                                            washerInfo?.capacidadeCargaBandejasInstrumentos
                                          }
                                          onChange={(e) =>
                                            setNewWasherModel(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="capacidadeCargaTraqueias"
                                        className=""
                                      >
                                        Capacidade de carga traquéias (60cm +
                                        120cm):
                                      </Label>
                                      <Input
                                        id="capacidadeCargaTraqueias"
                                        name="capacidadeCargaTraqueias"
                                        className="col-span-3"
                                        defaultValue={
                                          washerInfo?.capacidadeCargaTraqueias
                                        }
                                        onChange={(e) =>
                                          setNewWasherModel(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="flex justify-between items-center gap-4 w-full">
                                      <div className="flex flex-col w-full gap-2">
                                        <Label
                                          htmlFor="tempMedCicloInstrumentosCargaMaxMin"
                                          className=""
                                        >
                                          Tempo médio em minutos do ciclo de
                                          instrumentos com carga máxima:{" "}
                                        </Label>
                                        <Input
                                          id="tempMedCicloInstrumentosCargaMaxMin"
                                          name="tempMedCicloInstrumentosCargaMaxMin"
                                          className="col-span-3"
                                          defaultValue={
                                            washerInfo?.tempMedCicloInstrumentosCargaMaxMin
                                          }
                                          onChange={(e) =>
                                            setNewWasherModel(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="flex flex-col w-full gap-2">
                                        <Label
                                          htmlFor="tempMedCicloAssisVentCargaMaxMin"
                                          className=""
                                        >
                                          Tempo médio em minutos do ciclo de
                                          assistência ventilatória com carga
                                          máxima:{" "}
                                        </Label>
                                        <Input
                                          id="tempMedCicloAssisVentCargaMaxMin"
                                          name="tempMedCicloAssisVentCargaMaxMin"
                                          className="col-span-3"
                                          defaultValue={
                                            washerInfo?.tempMedCicloAssisVentCargaMaxMin
                                          }
                                          onChange={(e) =>
                                            setNewWasherModel(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>

                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="tempoDiarioAquecimentoMaqMin"
                                        className=""
                                      >
                                        Tempo em minutos para procedimento
                                        diário de aquecimento máquina fria:
                                      </Label>
                                      <Input
                                        id="tempoDiarioAquecimentoMaqMin"
                                        name="tempoDiarioAquecimentoMaqMin"
                                        className="col-span-3"
                                        defaultValue={
                                          washerInfo?.tempMedCicloInstrumentosCargaMaxMin
                                        }
                                        onChange={(e) =>
                                          setNewWasherModel(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label htmlFor="preco" className="">
                                        Preço:
                                      </Label>
                                      <Input
                                        id="preco"
                                        name="preco"
                                        className="col-span-3"
                                        defaultValue={washerInfo?.preco}
                                        onChange={(e) =>
                                          setNewWasherModel(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  {/* Adicione os outros campos do formulário aqui */}

                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        getWasherModel();
                                      }}
                                    >
                                      Cancelar
                                    </Button>
                                    <Button type="submit" variant="primary">
                                      Atualizar Lavadora
                                    </Button>
                                  </DialogFooter>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>

                          {/* Delete lavadora */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 size="18" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Tem certeza que deseja excluir essa lavadora?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Essa ação não poderá ser revertida. Isso
                                  excluirá permanentemente o modelo de lavadora.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteWasherModel(washer.id)}
                                >
                                  Sim, excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </Card>
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </>
  );
};

export default WasherModelos;
