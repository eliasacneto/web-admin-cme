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
interface Autoclave {
  id: number;
  modeloAutoclave: string;
  volumeTotCamaraLt: number;
  marcaAutoclave: number;
  volumeUtilCamaraLt: number;
  medTotTempoCicloATMin: number;
  tempoCargaDescargaMin: number;
  tempoClicloCarDescMin: number;
  tempoTestDiarioBDMin: number;
  tempoDiarioAquecimentoMaqMin: number;
  tempoDisponivelDiarioMin: number;
  producaoHospitalVolDiarioMaterialLt: number;
  volumeProcessadoIntervaloPicoLt90totDiario: number;
  intervaloDiarioPicoMin: number;
  numMaxCiclosDia: number;
  numMaxCiclosIntervaloPico: number;
  aproveitamentoCamaraPorcent: number;
  numAutoclaves: number;
  numAutoclavesUmaEmManutencao: number;
  capProcessamIntervaloPicoTodasAutoclavesOnLt: number;
  horasTrabalhoAtenderVolTotalHr: number;
  capUtilizTodasAutoclavesIntervaloPicoPorcent: number;
  preco: number;
}

interface AutoclaveBrand {
  id: number;
  nomeMarca: string;
  autoclaves: Autoclave[];
}

const AutoclaveModelos = () => {
  const { toast } = useToast();
  const [autoclaveInfo, setAutoclaveInfo] = useState<Autoclave>();
  const [autoclaveModel, setAutoclaveModel] = useState<AutoclaveBrand[]>([]);
  const [newAutoclaveModel, setNewAutoclaveModel] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  const getInfo = async (id: number) => {
    try {
      const responseA = await axios.get<Autoclave>(
        `http://localhost:8000/autoclaveModel/${id}`
      );
      setAutoclaveInfo(responseA.data);
    } catch (e) {
      console.error("Erro ao buscar modelos:", e);
      toast({
        variant: "destructive",
        title: "Erro ao obter modelos!",
        description: "Ocorreu um erro ao obter os modelos.",
      });
    }
  };

  const getAutoclaveModel = async () => {
    setLoading(true);
    try {
      const response = await axios.get<AutoclaveBrand[]>(
        "http://localhost:8000/autoclaveModel/by-brands"
      );
      setAutoclaveModel(response.data);
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
      id: autoclaveModel.length + 1,
      marcaAutoclave: selectedBrandId,
      modeloAutoclave: formData.get("modeloAutoclave") as string,
      volumeTotCamaraLt: Number(formData.get("volumeTotCamaraLt")),
      volumeUtilCamaraLt: Number(formData.get("volumeUtilCamaraLt")),
      medTotTempoCicloATMin: Number(formData.get("medTotTempoCicloATMin")),
      tempoCargaDescargaMin: Number(formData.get("tempoCargaDescargaMin")),
      tempoClicloCarDescMin: 0,
      tempoTestDiarioBDMin: Number(formData.get("tempoTestDiarioBDMin")),
      tempoDiarioAquecimentoMaqMin: Number(
        formData.get("tempoDiarioAquecimentoMaqMin")
      ),
      tempoDisponivelDiarioMin: 0,
      producaoHospitalVolDiarioMaterialLt: 14089,
      volumeProcessadoIntervaloPicoLt90totDiario: 0,
      intervaloDiarioPicoMin: 0,
      numMaxCiclosDia: 0.0,
      numMaxCiclosIntervaloPico: 0.0,
      aproveitamentoCamaraPorcent: 0.0,
      numAutoclaves: 3,
      numAutoclavesUmaEmManutencao: 0,
      capProcessamIntervaloPicoTodasAutoclavesOnLt: 0,
      horasTrabalhoAtenderVolTotalHr: 0,
      capUtilizTodasAutoclavesIntervaloPicoPorcent: 0.0,
      preco: Number(formData.get("preco")),
    };

    try {
      await axios.post("http://localhost:8000/autoclaveModel", body);
      console.log(body);
      toast({
        variant: "default",
        title: "Modelo adicionado com sucesso!",
      });
      getAutoclaveModel();
      setNewAutoclaveModel("");
    } catch (error) {
      console.error("Erro ao adicionar modelo:", error);
      toast({
        variant: "destructive",
        title: "Erro ao adicionar modelo!",
        description: "Ocorreu um erro ao adicionar o modelo.",
      });
    }
  };

  //   const updateAuto = async (
  //     id: number,
  //     modeloAutoclave: string,
  //     volumeTotCamaraLt: number = 14089,
  //     volumeUtilCamaraLt: number = 14089,
  //     medTotTempoCicloATMin: number = 14089,
  //     tempoCargaDescargaMin: number = 14089,
  //     tempoClicloCarDescMin: number = 14089,
  //     tempoTestDiarioBDMin: number = 14089,
  //     tempoDiarioAquecimentoMaqMin: number = 14089,
  //     tempoDisponivelDiarioMin: number = 0,
  //     producaoHospitalVolDiarioMaterialLt: number = 14089,
  //     volumeProcessadoIntervaloPicoLt90totDiario: number = 0,
  //     intervaloDiarioPicoMin: number = 0,
  //     numMaxCiclosDia: number = 0,
  //     numMaxCiclosIntervaloPico: number = 0,
  //     aproveitamentoCamaraPorcent: number = 0,
  //     numAutoclaves: number = 3,
  //     numAutoclavesUmaEmManutencao: number = 0,
  //     capProcessamIntervaloPicoTodasAutoclavesOnLt: number = 0,
  //     horasTrabalhoAtenderVolTotalHr: number = 0,
  //     capUtilizTodasAutoclavesIntervaloPicoPorcent: number = 0,
  //     preco: number = 14089
  //   ) => {
  //     try {
  //       await axios.put(`http://localhost:8000/autoclaveModel/${id}`, {
  //         id,
  //         modeloAutoclave,
  //         volumeTotCamaraLt,
  //         volumeUtilCamaraLt,
  //         medTotTempoCicloATMin,
  //         tempoCargaDescargaMin,
  //         tempoClicloCarDescMin,
  //         tempoTestDiarioBDMin,
  //         tempoDiarioAquecimentoMaqMin,
  //         tempoDisponivelDiarioMin,
  //         producaoHospitalVolDiarioMaterialLt,
  //         volumeProcessadoIntervaloPicoLt90totDiario,
  //         intervaloDiarioPicoMin,
  //         numMaxCiclosDia,
  //         numMaxCiclosIntervaloPico,
  //         aproveitamentoCamaraPorcent,
  //         numAutoclaves,
  //         numAutoclavesUmaEmManutencao,
  //         capProcessamIntervaloPicoTodasAutoclavesOnLt,
  //         horasTrabalhoAtenderVolTotalHr,
  //         capUtilizTodasAutoclavesIntervaloPicoPorcent,
  //         preco,
  //       });
  //     } catch (error) {
  //       console.error("Erro ao atualizar Lead:", error);
  //       toast({
  //         variant: "destructive",
  //         title: "Erro ao atualizar!",
  //         description: "Ocorreu um erro ao atualizar o Lead.",
  //       });
  //     }
  //   };

  const updateAutoclaveModel = async (
    id: number,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    getInfo(id);
    if (!autoclaveInfo) {
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
      marcaAutoclave: selectedBrandId,
      modeloAutoclave: formData.get("modeloAutoclave") as string,
      volumeTotCamaraLt: Number(formData.get("volumeTotCamaraLt")),
      volumeUtilCamaraLt: Number(formData.get("volumeUtilCamaraLt")),
      medTotTempoCicloATMin: Number(formData.get("medTotTempoCicloATMin")),
      tempoCargaDescargaMin: Number(formData.get("tempoCargaDescargaMin")),
      tempoClicloCarDescMin: Number(formData.get("tempoClicloCarDescMin")),
      tempoTestDiarioBDMin: Number(formData.get("tempoTestDiarioBDMin")),
      tempoDiarioAquecimentoMaqMin: Number(
        formData.get("tempoDiarioAquecimentoMaqMin")
      ),
      tempoDisponivelDiarioMin: Number(
        formData.get("tempoDisponivelDiarioMin")
      ),
      producaoHospitalVolDiarioMaterialLt: Number(
        formData.get("producaoHospitalVolDiarioMaterialLt")
      ),
      volumeProcessadoIntervaloPicoLt90totDiario: Number(
        formData.get("volumeProcessadoIntervaloPicoLt90totDiario")
      ),
      intervaloDiarioPicoMin: Number(formData.get("intervaloDiarioPicoMin")),
      numMaxCiclosDia: Number(formData.get("numMaxCiclosDia")),
      numMaxCiclosIntervaloPico: Number(
        formData.get("numMaxCiclosIntervaloPico")
      ),
      aproveitamentoCamaraPorcent: Number(
        formData.get("aproveitamentoCamaraPorcent")
      ),
      numAutoclaves: Number(formData.get("numAutoclaves")),
      numAutoclavesUmaEmManutencao: Number(
        formData.get("numAutoclavesUmaEmManutencao")
      ),
      capProcessamIntervaloPicoTodasAutoclavesOnLt: Number(
        formData.get("capProcessamIntervaloPicoTodasAutoclavesOnLt")
      ),
      horasTrabalhoAtenderVolTotalHr: Number(
        formData.get("horasTrabalhoAtenderVolTotalHr")
      ),
      capUtilizTodasAutoclavesIntervaloPicoPorcent: Number(
        formData.get("capUtilizTodasAutoclavesIntervaloPicoPorcent")
      ),
      preco: Number(formData.get("preco")),
    };

    try {
      await axios.put(
        `http://localhost:8000/autoclaveModel/${autoclaveInfo.id}`,
        data
      );
      console.log(selectedBrandId);
      getAutoclaveModel();
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

  const deleteAutoclaveModel = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/autoclaveModel/${id}`);
      toast({
        variant: "destructive",
        title: "Modelo removido com sucesso!",
      });
      getAutoclaveModel();
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
    getAutoclaveModel();
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
              <BreadcrumbLink href="/dashboard/autoclaves/brands">
                Autoclaves
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
          <h3 className="font-bold text-2xl">Modelos de Autoclaves</h3>
          <p className="text-lg text-gray-400">
            Gerencie os modelos de Autoclaves disponíveis no seu estoque
          </p>
        </div>

        {/* Form to create a new autoclave model */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">+ Novo modelo</Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Novo modelo de autoclave</DialogTitle>
              <DialogDescription>
                Preencha os campos para cadastrar um novo modelo de autoclave.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={saveData}>
              <div className="flex flex-col justify-start items-start gap-4 py-4">
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="marcaAutoclave">Marca da Autoclave:</Label>
                    <Select
                      onValueChange={(value) =>
                        setSelectedBrandId(Number(value))
                      }
                    >
                      <SelectTrigger id="marcaAutoclave">
                        <SelectValue placeholder="Selecione uma marca" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {autoclaveModel.map((brand) => (
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
                      id="modeloAutoclave"
                      name="modeloAutoclave"
                      className="col-span-3"
                      value={newAutoclaveModel}
                      onChange={(e) => setNewAutoclaveModel(e.target.value)}
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
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="volumeUtilCamaraLt" className="">
                      Volume útil da câmara (L):
                    </Label>
                    <Input
                      id="volumeUtilCamaraLt"
                      name="volumeUtilCamaraLt"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="medTotTempoCicloATMin" className="">
                    Tempo em minutos do total médio do ciclo de alta temperatura
                    incluindo secagem (capacidade máxima):
                  </Label>
                  <Input
                    id="medTotTempoCicloATMin"
                    name="medTotTempoCicloATMin"
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="tempoCargaDescargaMin" className="">
                      Tempo em minutos de Carga e Descarga:
                    </Label>
                    <Input
                      id="tempoCargaDescargaMin"
                      name="tempoCargaDescargaMin"
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="tempoTestDiarioBDMin" className="">
                      Tempo em minutos para teste diário B&D:
                    </Label>
                    <Input
                      id="tempoTestDiarioBDMin"
                      name="tempoTestDiarioBDMin"
                      className="col-span-3"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="tempoDiarioAquecimentoMaqMin" className="">
                    Tempo em minutos para procedimento diário de aquecimento
                    máquina fria:
                  </Label>
                  <Input
                    id="tempoDiarioAquecimentoMaqMin"
                    name="tempoDiarioAquecimentoMaqMin"
                    className="col-span-3"
                  />
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
                  Cadastrar Autoclave
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {autoclaveModel &&
        autoclaveModel.map((brand) => (
          <Accordion type="single" collapsible key={brand.id}>
            <AccordionItem value={`brand-${brand.id}`}>
              <AccordionTrigger className="text-xl font-bold rounded-md mt-2 bg-gray-100">
                <p className="text-slate-800 text-base ml-4">
                  <span className="text-[#859221]">Marca:</span>{" "}
                  {brand.nomeMarca}
                </p>
              </AccordionTrigger>
              <AccordionContent>
                {brand.autoclaves &&
                  brand.autoclaves.map((autoclave) => (
                    <Card className="w-full" key={autoclave.id}>
                      <div className="flex items-center justify-between m-5">
                        <div className="flex gap-5 items-center">
                          <h1 className="text-base font-semibold">
                            {autoclave.modeloAutoclave}
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
                                  getInfo(autoclave.id);
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
                                    {autoclave.modeloAutoclave}
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
                                        id="marcaAutoclave"
                                        name="marcaAutoclave"
                                        className="col-span-3"
                                        value={brand?.nomeMarca}
                                        readOnly
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="modeloAutoclave"
                                        className=""
                                      >
                                        Nome do modelo:
                                      </Label>
                                      <Input
                                        id="modeloAutoclave"
                                        name="modeloAutoclave"
                                        className="col-span-3"
                                        value={autoclaveInfo?.modeloAutoclave}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="volumeTotCamaraLt"
                                        className=""
                                      >
                                        Volume total da câmara (L):
                                      </Label>
                                      <Input
                                        id="volumeTotCamaraLt"
                                        name="volumeTotCamaraLt"
                                        className="col-span-3"
                                        value={autoclaveInfo?.volumeTotCamaraLt}
                                        readOnly
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="volumeUtilCamaraLt"
                                        className=""
                                      >
                                        Volume útil da câmara (L):
                                      </Label>
                                      <Input
                                        id="volumeUtilCamaraLt"
                                        name="volumeUtilCamaraLt"
                                        className="col-span-3"
                                        defaultValue={
                                          autoclaveInfo?.volumeUtilCamaraLt
                                        }
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className="flex flex-col w-full gap-2">
                                    <Label
                                      htmlFor="medTotTempoCicloATMin"
                                      className=""
                                    >
                                      Tempo em minutos do total médio do ciclo
                                      de alta temperatura incluindo secagem
                                      (capacidade máxima):
                                    </Label>
                                    <Input
                                      id="medTotTempoCicloATMin"
                                      name="medTotTempoCicloATMin"
                                      defaultValue={
                                        autoclaveInfo?.medTotTempoCicloATMin
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="tempoCargaDescargaMin"
                                        className=""
                                      >
                                        Tempo em minutos de Carga e Descarga:
                                      </Label>
                                      <Input
                                        id="tempoCargaDescargaMin"
                                        name="tempoCargaDescargaMin"
                                        defaultValue={
                                          autoclaveInfo?.tempoCargaDescargaMin
                                        }
                                        readOnly
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="tempoTestDiarioBDMin"
                                        className=""
                                      >
                                        Tempo em minutos para teste diário B&D:
                                      </Label>
                                      <Input
                                        id="tempoTestDiarioBDMin"
                                        name="tempoTestDiarioBDMin"
                                        defaultValue={
                                          autoclaveInfo?.tempoTestDiarioBDMin
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
                                      defaultValue={
                                        autoclaveInfo?.tempoDiarioAquecimentoMaqMin
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
                                      defaultValue={autoclaveInfo?.preco}
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

                          {/* Form to edit an autoclave model */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  getInfo(autoclave.id);
                                }}
                              >
                                <Edit2 size="16" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Editar Autoclave:{" "}
                                  <span className="text-[#8c9a20]">
                                    {autoclave.modeloAutoclave}
                                  </span>
                                </DialogTitle>
                                <DialogDescription>
                                  Preencha os campos para editar a autoclave
                                  selecionada
                                </DialogDescription>
                              </DialogHeader>
                              {autoclaveInfo && (
                                <form
                                  onSubmit={(e) =>
                                    updateAutoclaveModel(autoclave.id, e)
                                  }
                                >
                                  <div className="flex flex-col justify-start items-start gap-4 py-4">
                                    <div className="flex justify-between items-center gap-4 w-full">
                                      <div className="flex flex-col w-full gap-2">
                                        <Label htmlFor="marcaLavadora">
                                          Marca da Autoclave:
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
                                            {autoclaveModel.map((brand) => (
                                              <SelectItem
                                                key={brand.id}
                                                value={String(brand.id)}
                                              >
                                                {brand?.nomeMarca}
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
                                          id="modeloAutoclave"
                                          name="modeloAutoclave"
                                          className="col-span-3"
                                          defaultValue={
                                            autoclaveInfo?.modeloAutoclave
                                          }
                                          onChange={(e) =>
                                            setNewAutoclaveModel(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="flex justify-between items-center gap-4 w-full">
                                      <div className="flex flex-col w-full gap-2">
                                        <Label
                                          htmlFor="volumeTotCamaraLt"
                                          className=""
                                        >
                                          Volume total da câmara (L):
                                        </Label>
                                        <Input
                                          id="volumeTotCamaraLt"
                                          name="volumeTotCamaraLt"
                                          className="col-span-3"
                                          defaultValue={
                                            autoclaveInfo?.volumeTotCamaraLt
                                          }
                                        />
                                      </div>
                                      <div className="flex flex-col w-full gap-2">
                                        <Label
                                          htmlFor="volumeUtilCamaraLt"
                                          className=""
                                        >
                                          Volume útil da câmara (L):
                                        </Label>
                                        <Input
                                          id="volumeUtilCamaraLt"
                                          name="volumeUtilCamaraLt"
                                          className="col-span-3"
                                          defaultValue={
                                            autoclaveInfo?.volumeUtilCamaraLt
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="medTotTempoCicloATMin"
                                        className=""
                                      >
                                        Tempo em minutos do total médio do ciclo
                                        de alta temperatura incluindo secagem
                                        (capacidade máxima):
                                      </Label>
                                      <Input
                                        id="medTotTempoCicloATMin"
                                        name="medTotTempoCicloATMin"
                                        defaultValue={
                                          autoclaveInfo?.medTotTempoCicloATMin
                                        }
                                      />
                                    </div>
                                    <div className="flex justify-between items-center gap-4 w-full">
                                      <div className="flex flex-col w-full gap-2">
                                        <Label
                                          htmlFor="tempoCargaDescargaMin"
                                          className=""
                                        >
                                          Tempo em minutos de Carga e Descarga:
                                        </Label>
                                        <Input
                                          id="tempoCargaDescargaMin"
                                          name="tempoCargaDescargaMin"
                                          defaultValue={
                                            autoclaveInfo?.tempoCargaDescargaMin
                                          }
                                        />
                                      </div>
                                      <div className="flex flex-col w-full gap-2">
                                        <Label
                                          htmlFor="tempoTestDiarioBDMin"
                                          className=""
                                        >
                                          Tempo em minutos para teste diário
                                          B&D:
                                        </Label>
                                        <Input
                                          id="tempoTestDiarioBDMin"
                                          name="tempoTestDiarioBDMin"
                                          defaultValue={
                                            autoclaveInfo?.tempoTestDiarioBDMin
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
                                        defaultValue={
                                          autoclaveInfo?.tempoDiarioAquecimentoMaqMin
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
                                        defaultValue={autoclaveInfo?.preco}
                                      />
                                    </div>
                                  </div>

                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        getAutoclaveModel();
                                      }}
                                    >
                                      Cancelar
                                    </Button>
                                    <Button type="submit" variant="primary">
                                      Atualizar Autoclave
                                    </Button>
                                  </DialogFooter>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>

                          {/* Button to delete autoclave model */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setSelectedBrandId(autoclave.id);
                                }}
                              >
                                <Trash2 size="16" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Você tem certeza que deseja deletar este
                                  modelo de autoclave?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Essa ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    deleteAutoclaveModel(autoclave.id)
                                  }
                                  className="bg-red-600 focus:ring-red-600"
                                >
                                  Confirmar
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

export default AutoclaveModelos;
