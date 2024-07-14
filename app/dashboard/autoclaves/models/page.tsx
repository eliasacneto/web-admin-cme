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
  volumeUtilCamaraLt: number;
  medTotTempoCicloATMin: number;
  tempoCargaDescargaMin: number;
  tempoTestDiarioBDMin: number;
  tempoDiarioAquecimentoMaqMin: number;
  preco: number;
}

interface AutoclaveBrand {
  id: number;
  nomeMarca: string;
  marcaAutoclave: number;
  autoclaves: Autoclave[];
}

const AutoclaveModelos = () => {
  const { toast } = useToast();
  const [autoclaveModel, setAutoclaveModel] = useState<AutoclaveBrand[]>([]);

  const [newAutoclaveModel, setNewAutoclaveModel] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  const getAutoclaveModel = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
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
    const form = e.currentTarget;
    const input = form.elements.namedItem("name") as HTMLInputElement;

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
      //   modeloAutoclave: input.value,

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
    console.log(body);

    try {
      await axios.post("http://localhost:8000/autoclaveModel", body);
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

  const getAutoclaveBrands = async () => {
    try {
      const response = await axios.get("http://localhost:8000/autoclaveModel/");
      setAutoclaveModel(response.data);
    } catch (e) {
      console.error("Erro ao buscar marcas:", e);
      toast({
        variant: "destructive",
        title: "Erro ao buscar marcas!",
        description: "Ocorreu um erro ao buscar as marcas.",
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
              <BreadcrumbLink href="/components">Autoclaves</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Modelos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-between mt-10">
        <div className="flex flex-col antialiased">
          <h3 className="font-bold text-2xl">Modelos de Autoclaves</h3>
          <p className="text-lg text-gray-400">
            Gerencie os modelos de Autoclaves disponíveis no seu estoque
          </p>
        </div>

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
                    <Label htmlFor="marcaAutoclave">Marca:</Label>
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
                  Cadastrar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {autoclaveModel.map((brand) => (
        <Accordion type="single" collapsible key={brand.id}>
          <AccordionItem value={`brand-${brand.id}`}>
            <AccordionTrigger className="text-xl font-bold mt-10 text-zinc-800">
              <p className="text-[#A7B928]">{brand.nomeMarca}</p>
            </AccordionTrigger>
            <AccordionContent>
              {brand.autoclaves.map((autoclave) => (
                <Card className="w-full" key={autoclave.id}>
                  <div className="flex items-center justify-between m-5">
                    <div className="flex gap-5 items-center">
                      <img
                        src="/assets/images/equipacare-fav.png"
                        alt="image"
                        width={42}
                      />
                      <h1 className="text-lg font-bold">
                        {autoclave.modeloAutoclave}
                      </h1>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="icon">
                        <Eye size="18" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit2 size="16" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="text-white "
                            // onClick={() => deleteBrand(item.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                          {/* <Button variant="outline">Show Dialog</Button> */}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Deseja remover este item?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não poderá ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => deleteAutoclaveModel(autoclave.id)}
                            >
                              Excluir
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
