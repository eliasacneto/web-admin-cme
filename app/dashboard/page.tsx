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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Edit, Eye, Trash2 } from "lucide-react";
import Loader from "@/components/loader";
import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Lead {
  id: number;
  nomeLead: string;
  customer: string;
  hospitalNome: string;
  hospitalEmail: string;
  hospitalContato: string;
  cnpj: string;
  cargo: string;
  cep: string;
  numero: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface AutoclaveRecommendation {
  nomeMarca: string;
  modeloAutoclave: string;
  preco: number;
}

interface WasherRecommendation {
  nomeMarca: string;
  modeloLavadora: string;
  preco: number;
}

interface LeadData {
  autoclaveRecommendations?: AutoclaveRecommendation[];
  washerRecommendations?: WasherRecommendation[];
}

const Dashboard = () => {
  const { toast } = useToast();
  const [lead, setLead] = useState<Lead[]>([]);
  const [newLead, setNewLead] = useState<string>("");
  const [leadData, setLeadData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getRecommendations = async (lead: any) => {
    try {
      const lastId = lead.id;
      console.log(`O id que está sendo enviado é: ${lastId}`);

      const response = await axios.get(`http://localhost:8000/lead/${lastId}`);
      console.log("Detalhes do lead:", response.data);

      setLeadData(response.data);
    } catch (error) {
      console.error("Erro ao obter recomendações:", error);
    }
  };

  const getLead = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/lead");
      await getRecommendations(response.data[0]);
      if (response.status === 200) {
        setLead(response.data);
      } else {
        console.error(`Erro ao buscar leads: Status ${response.status}`);
        toast({
          variant: "destructive",
          title: "Erro ao buscar leads!",
          description: `Ocorreu um erro ao buscar seus leads: Status ${response.status}`,
        });
      }
    } catch (e) {
      console.error("Erro ao buscar leads:", e);
      toast({
        variant: "destructive",
        title: "Erro ao buscar leads!",
        description: "Ocorreu um erro ao buscar seus leads.",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveLead = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget; // Usar e.currentTarget para garantir que seja um HTMLFormElement
    const input = form.elements.namedItem("name") as HTMLInputElement;

    const formData = new FormData(form);
    const body = {
      //   id: lead.length + 1,
      nomeLead: formData.get("nomeLead") as string,
      hospitalEmail: formData.get("hospitalEmail") as string,
      hospitalContato: formData.get("hospitalContato") as string,
      hospitalNome: formData.get("hospitalNome") as string,
      cnpj: formData.get("cnpj") as string,
      cargo: formData.get("cargo") as string,
      cep: formData.get("cep") as string,
      numero: formData.get("numero") as string,
      rua: formData.get("rua") as string,
      bairro: formData.get("bairro") as string,
      cidade: formData.get("cidade") as string,
      estado: formData.get("estado") as string,
      numeroSalasCirurgias: formData.get("estado") as string,
      numeroCirurgiaSalaDia: formData.get("estado") as string,
      numeroLeitoUTI: formData.get("numeroLeitoUTI") as string,
      numeroLeitoRPA: formData.get("numeroLeitoRPA") as string,
      numeroLeitoObs: formData.get("numeroLeitoObs") as string,
      numeroLeitoHospitalDia: formData.get("numeroLeitoHospitalDia") as string,
      momentoAtualEmpreendimento: formData.get(
        "momentoAtualEmpreendimento"
      ) as string,
      possuiEngenhariaClinica: formData.get(
        "possuiEngenhariaClinica"
      ) as string,
      tipoEngenhariaClinica: formData.get("tipoEngenhariaClinica") as string,

      precisaCME: formData.get("precisaCME") as string,
      busco: formData.get("busco") as string,
      diaSemanaCirurgia: formData.get("diaSemanaCirurgia") as string,
      intervaloPicoCME: formData.get("intervaloPicoCME") as string,
      tipoProcessamento: formData.get("tipoProcessamento") as string,
      aceitarTermos: formData.get("aceitarTermos") as string,
      obsEngenhariaClinica: formData.get("obsEngenhariaClinica") as string,
    };

    if (input.value !== "") {
      try {
        await axios.post("http://localhost:8000/lead", body);
        toast({
          variant: "default",
          title: "Lead adicionado com sucesso!",
        });
        getLead();
        setNewLead("");
      } catch (error) {
        console.error("Erro ao adicionar novo Lead:", error);
        toast({
          variant: "destructive",
          title: "Ops!",
          description: "Ocorreu um erro ao adicionar este Lead.",
        });
      }
    } else {
      alert("Não é possível salvar uma Lead sem nome");
    }
  };

  const updateLead = async (
    id: number,
    nomeLead: string,
    hospitalNome: string,
    hospitalEmail: string,
    hospitalContato: string,
    cnpj: string,
    cargo: string,
    cep: string,
    numero: string,
    rua: string,
    bairro: string
    // cidade: string,
    // estado: string,
    // numeroSalasCirurgias: number,
    // numeroCirurgiaSalaDia: number,
    // numeroLeitoUTI: number,
    // numeroLeitoInternacao: number,
    // numeroLeitoRPA: number,
    // numeroLeitoObs: number,
    // numeroLeitoHospitalDia: number,
    // momentoAtualEmpreendimento: string,
    // possuiEngenhariaClinica: string,
    // tipoEngenhariaClinica: string,

    // precisaCME: string,
    // busco: string,
    // diaSemanaCirurgia: string[],
    // intervaloPicoCME: string,
    // tipoProcessamento: string,
    // aceitarTermos: string,
    // obsEngenhariaClinica: string
  ) => {
    try {
      await axios.put(`http://localhost:8000/lead/${id}`, {
        id,
        nomeLead,
        hospitalNome,
        hospitalEmail,
        hospitalContato,
        cnpj,
        cargo,
        cep,
        numero,
        rua,
        bairro,
      });

      getLead();
    } catch (error) {
      console.error("Erro ao atualizar Lead:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar!",
        description: "Ocorreu um erro ao atualizar o Lead.",
      });
    }
  };

  const deleteLead = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/lead/${id}`);
      toast({
        variant: "destructive",
        title: "Marca removida com sucesso!",
      });
      getLead(); // Atualiza a lista de marcas
    } catch (error) {
      console.error("Erro ao remover Lead:", error);
      toast({
        variant: "destructive",
        title: "Erro ao remover marca!",
        description: "Ocorreu um erro ao remover o Lead.",
      });
    }
  };

  useEffect(() => {
    getLead();
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
              <BreadcrumbLink>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Leads</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex justify-between mt-10">
        <div className="flex flex-col antialiased">
          <h3 className="font-bold text-2xl">Meus Leads</h3>
          <p className="text-lg text-gray-400">
            Visualize e adicione clientes em potencial para entrar em contato
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">+ Novo cadastro</Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Adicionar novo Lead</DialogTitle>
              <DialogDescription>
                Preencha os campos para cadastrar um novo cliente em potencial.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={saveLead}>
              <div className="flex flex-col justify-start items-start gap-4 py-4">
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="nomeLead" className="">
                      Nome completo:
                    </Label>
                    <Input
                      id="nomeLead"
                      defaultValue=""
                      className="col-span-3"
                      value={newLead}
                      onChange={(e) => setNewLead(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="hospitalEmail" className="">
                      E-mail do hospital:
                    </Label>
                    <Input
                      id="hospitalEmail"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="hospitalContato" className="">
                      Contato:
                    </Label>
                    <Input
                      id="hospitalContato"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="hospitalNome" className="">
                    Nome do hospital:
                  </Label>
                  <Input
                    id="hospitalNome"
                    defaultValue=""
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="cnpj" className="">
                      CNPJ:
                    </Label>
                    <Input id="cnpj" defaultValue="" className="col-span-3" />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="cargo" className="">
                      Cargo atual:
                    </Label>
                    <Input id="cargo" defaultValue="" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="cep" className="">
                      CEP:
                    </Label>
                    <Input id="cep" defaultValue="" className="col-span-3" />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="numero" className="">
                      Número:
                    </Label>
                    <Input id="numero" defaultValue="" className="col-span-3" />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="rua" className="">
                    Rua:
                  </Label>
                  <Input id="rua" defaultValue="" className="col-span-3" />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="bairro" className="">
                    Bairro:
                  </Label>
                  <Input id="bairro" defaultValue="" className="col-span-3" />
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="cidade" className="">
                      Cidade:
                    </Label>
                    <Input id="cidade" defaultValue="" className="col-span-3" />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="estado" className="">
                      UF:
                    </Label>
                    <Input id="estado" defaultValue="" className="col-span-3" />
                  </div>
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

      <Table className="mt-14 bg-gray-200/30 rounded-lg ">
        <TableCaption className="text-gray-400">Lista de Leads</TableCaption>
        <TableHeader className="bg-zinc-900 w-full hover:bg:zinc-900">
          <TableRow className="">
            <TableHead className="w-[70px] font-bold text-white">#</TableHead>
            <TableHead className="font-bold text-white">Hospital</TableHead>
            <TableHead className="font-bold text-white">Cliente</TableHead>
            <TableHead className="font-bold text-white">Contato</TableHead>
            <TableHead className=" font-bold text-white">Cidade</TableHead>
            <TableHead className=" font-bold text-white">UF</TableHead>
            <TableHead className=" font-bold text-white text-right">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lead.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.hospitalNome}</TableCell>
              <TableCell>{item.nomeLead}</TableCell>
              <TableCell>{item.hospitalContato}</TableCell>
              <TableCell>{item.cidade}</TableCell>
              <TableCell className="w-[70px]">{item.estado}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Eye size={18} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-screen-lg p-4 ">
                      <DialogHeader>
                        <DialogTitle className="text-xl">
                          Informações do Lead
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <form className="max-w=screen overflow-y-auto max-h-[80vh] pl-4 pr-4">
                        <div className="flex flex-col justify-start items-start gap-4 py-4 p-4">
                          <div className="flex justify-between items-center gap-4 w-full ">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="nomeLead" className="">
                                Nome completo:
                              </Label>
                              <Input
                                id={`nomeLead-${item.id}`}
                                defaultValue={item.nomeLead}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="hospitalNome" className="">
                                Nome do hospital:
                              </Label>
                              <Input
                                id={`hospitalNome-${item.id}`}
                                value={item.hospitalNome}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="hospitalEmail" className="">
                                E-mail do hospital:
                              </Label>
                              <Input
                                id={`hospitalEmail-${item.id}`}
                                value={item.hospitalEmail}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="hospitalContato" className="">
                                Contato:
                              </Label>
                              <Input
                                id={`hospitalContato-${item.id}`}
                                value={item.hospitalContato}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="cargo" className="">
                                Cargo atual:
                              </Label>
                              <Input
                                id={`cargo-${item.id}`}
                                value={item.cargo}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="cnpj" className="">
                                CNPJ:
                              </Label>
                              <Input
                                id={`cnpj-${item.id}`}
                                value={item.cnpj}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="cep" className="">
                                CEP:
                              </Label>
                              <Input
                                id={`cep-${item.id}`}
                                value={item.cep}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="numero" className="">
                                Número:
                              </Label>
                              <Input
                                id={`numero-${item.id}`}
                                value={item.numero}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="rua" className="">
                                Avenida/Rua:
                              </Label>
                              <Input
                                id={`rua-${item.id}`}
                                value={item.rua}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="bairro" className="">
                                Bairro:
                              </Label>
                              <Input
                                id={`bairro-${item.id}`}
                                value={item.bairro}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="cidade" className="">
                                Cidade:
                              </Label>
                              <Input
                                id={`cidade-${item.id}`}
                                value={item.cidade}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="estado" className="">
                                UF:
                              </Label>
                              <Input
                                id={`estado-${item.id}`}
                                value={item.estado}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex mb-10">
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="item-1">
                              <AccordionTrigger className="font-bold">
                                Mais detalhes
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="flex flex-col justify-start items-start gap-4 py-4 p-4">
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="numeroSalasCirurgicas"
                                        className=""
                                      >
                                        Número de salas cirúrgicas:
                                      </Label>
                                      <Input
                                        id={`numeroSalasCirurgicas-${item.id}`}
                                        defaultValue={
                                          leadData.numeroSalasCirurgicas
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="numeroCirurgiaSalaDia"
                                        className=""
                                      >
                                        Número de cirurgias/sala/dia:
                                      </Label>
                                      <Input
                                        id={`numeroCirurgiaSalaDia-${item.id}`}
                                        value={leadData.numeroCirurgiaSalaDia}
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="numeroLeitoUTI"
                                        className=""
                                      >
                                        Número de leitos UTI:
                                      </Label>
                                      <Input
                                        id={`numeroLeitoUTI-${item.id}`}
                                        value={leadData.numeroLeitoUTI}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="numeroLeitoInternacao"
                                        className=""
                                      >
                                        Número de leitos Internação:
                                      </Label>
                                      <Input
                                        id={`numeroLeitoInternacao-${item.id}`}
                                        value={leadData.numeroLeitoInternacao}
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="numeroLeitoRPA"
                                        className=""
                                      >
                                        Número de leitos RPA:
                                      </Label>
                                      <Input
                                        id={`numeroLeitoRPA-${item.id}`}
                                        value={leadData.numeroLeitoRPA}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="numeroLeitoObs"
                                        className=""
                                      >
                                        Número de leitos Observações:
                                      </Label>
                                      <Input
                                        id={`numeroLeitoObs-${item.id}`}
                                        value={leadData.numeroLeitoObs}
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="numeroLeitoHospitalDia"
                                        className=""
                                      >
                                        Número de leitos Hospita/dia:
                                      </Label>
                                      <Input
                                        id={`numeroLeitoHospitalDia-${item.id}`}
                                        value={leadData.numeroLeitoHospitalDia}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label
                                        htmlFor="momentoAtualEmpreendimento"
                                        className=""
                                      >
                                        Momento atual do empreendimento:
                                      </Label>
                                      <Input
                                        id={`momentoAtualEmpreendimento-${item.id}`}
                                        value={
                                          leadData.momentoAtualEmpreendimento
                                        }
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center gap-4 w-full">
                                    <div className="flex flex-col w-full gap-2">
                                      <Label htmlFor="rua" className="">
                                        Possui engenharia clínica?
                                      </Label>
                                      <Input
                                        id={`possuiEngenhariaClinica-${item.id}`}
                                        value={leadData.possuiEngenhariaClinica}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="flex flex-col w-full gap-2">
                                      <Label htmlFor="bairro" className="">
                                        As cirurgias são realizadas nos dias:
                                      </Label>
                                      <Input
                                        id={`bairro-${item.id}`}
                                        value={leadData.diaSemanaCirurgia}
                                        className="col-span-3"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                              <AccordionTrigger className="rounded-md mt-4 font-bold text-base">
                                Nossas recomendações
                              </AccordionTrigger>
                              <AccordionContent>
                                <h5 className="font-semibold text-slate-950 mb-4 mt-2 antialiased text-base p-4">
                                  Autoclaves:
                                </h5>
                                <Table className="rounded">
                                  <TableHeader className="">
                                    <TableRow className="bg-[#95a140]/90 hover:bg-[#95a140]/90 rounded-lg">
                                      <TableHead className="font-bold text-white">
                                        Marca
                                      </TableHead>
                                      <TableHead className="font-bold text-white">
                                        Modelo
                                      </TableHead>
                                      <TableHead className="text-right font-bold text-white">
                                        Faixa de preço
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {leadData.autoclaveRecommendations &&
                                      leadData.autoclaveRecommendations.map(
                                        (autoclave: any, index: number) => (
                                          <TableRow key={index}>
                                            <TableCell>
                                              {autoclave.nomeMarca}
                                            </TableCell>
                                            <TableCell>
                                              {autoclave.modeloAutoclave}
                                            </TableCell>
                                            <TableCell className="text-right">
                                              R${autoclave.preco}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                  </TableBody>
                                </Table>
                                <hr />
                                <h5 className="font-semibold text-slate-950 mb-4 mt-5 antialiased text-base">
                                  Lavadoras :
                                </h5>
                                <Table className="rounded p-4">
                                  <TableHeader className="">
                                    <TableRow className="bg-[#95a140]/90 hover:bg-[#95a140]/90 rounded-lg">
                                      <TableHead className="font-bold text-white">
                                        Marca
                                      </TableHead>
                                      <TableHead className="font-bold text-white">
                                        Modelo
                                      </TableHead>
                                      <TableHead className="text-right font-bold text-white">
                                        Faixa de preço
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {leadData.washerRecommendations &&
                                      leadData.washerRecommendations.map(
                                        (washer: any, index: number) => (
                                          <TableRow key={index}>
                                            <TableCell>
                                              {washer.nomeMarca}
                                            </TableCell>
                                            <TableCell>
                                              {washer.modeloLavadora}
                                            </TableCell>
                                            <TableCell className="text-right">
                                              R${washer.preco}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                  </TableBody>
                                </Table>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>

                        <DialogFooter>
                          <Button variant="outline">Fechar</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Edit size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-screen-md ">
                      <DialogHeader>
                        <DialogTitle>Editar Lead</DialogTitle>
                        <DialogDescription>
                          Altere o nome da marca da Autoclave
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          const form = e.currentTarget;
                          const nomeLead = form.elements.namedItem(
                            `nomeLead-${item.id}`
                          ) as HTMLInputElement;
                          const hospitalNome = form.elements.namedItem(
                            `hospitalNome-${item.id}`
                          ) as HTMLInputElement;
                          const hospitalContato = form.elements.namedItem(
                            `hospitalContato-${item.id}`
                          ) as HTMLInputElement;
                          const cnpj = form.elements.namedItem(
                            `cnpj-${item.id}`
                          ) as HTMLInputElement;
                          const cargo = form.elements.namedItem(
                            `cargo-${item.id}`
                          ) as HTMLInputElement;
                          const cep = form.elements.namedItem(
                            `cep-${item.id}`
                          ) as HTMLInputElement;
                          const rua = form.elements.namedItem(
                            `rua-${item.id}`
                          ) as HTMLInputElement;
                          const numero = form.elements.namedItem(
                            `numero-${item.id}`
                          ) as HTMLInputElement;
                          const bairro = form.elements.namedItem(
                            `bairro-${item.id}`
                          ) as HTMLInputElement;
                          updateLead(
                            item.id,
                            nomeLead.value,
                            hospitalNome.value,
                            item.hospitalEmail,
                            hospitalContato.value,
                            cnpj.value,
                            cargo.value,
                            cep.value,
                            numero.value,
                            rua.value,
                            bairro.value
                          )
                            .then(() => {
                              toast({
                                variant: "default",
                                title: "Marca atualizada com sucesso!",
                              });
                            })
                            .catch(() => {
                              toast({
                                variant: "destructive",
                                title: "Erro ao atualizar marca!",
                                description:
                                  "Ocorreu um erro ao atualizar a marca.",
                              });
                            });

                          getLead();
                        }}
                      >
                        <div className="flex flex-col justify-start items-start gap-4 py-4 ">
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="nomeLead" className="">
                                Nome completo:
                              </Label>
                              <Input
                                id={`nomeLead-${item.id}`}
                                defaultValue={item.nomeLead}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="hospitalNome" className="">
                                Nome do hospital:
                              </Label>
                              <Input
                                id={`hospitalNome-${item.id}`}
                                defaultValue={item.hospitalNome}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="hospitalEmail" className="">
                                E-mail do hospital:
                              </Label>
                              <Input
                                id={`hospitalEmail-${item.id}`}
                                defaultValue={item.hospitalEmail}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="hospitalContato" className="">
                                Contato:
                              </Label>
                              <Input
                                id={`hospitalContato-${item.id}`}
                                defaultValue={item.hospitalContato}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="cargo" className="">
                                Cargo atual:
                              </Label>
                              <Input
                                id={`cargo-${item.id}`}
                                defaultValue={item.cargo}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="cnpj" className="">
                                CNPJ:
                              </Label>
                              <Input
                                id={`cnpj-${item.id}`}
                                defaultValue={item.cnpj}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="cep" className="">
                                CEP:
                              </Label>
                              <Input
                                id={`cep-${item.id}`}
                                defaultValue={item.cep}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="numero" className="">
                                Número:
                              </Label>
                              <Input
                                id={`numero-${item.id}`}
                                defaultValue={item.numero}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="rua" className="">
                                Avenida/Rua:
                              </Label>
                              <Input
                                id={`rua-${item.id}`}
                                defaultValue={item.rua}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="bairro" className="">
                                Bairro:
                              </Label>
                              <Input
                                id={`bairro-${item.id}`}
                                defaultValue={item.bairro}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="cidade" className="">
                                Cidade:
                              </Label>
                              <Input
                                id={`cidade-${item.id}`}
                                defaultValue={item.cidade}
                                className="col-span-3"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                              <Label htmlFor="estado" className="">
                                UF:
                              </Label>
                              <Input
                                id={`estado-${item.id}`}
                                defaultValue={item.estado}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter className="gap-2">
                          <Button variant="primary" type="submit">
                            Atualizar
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

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
                          Deseja remover este possível cliente?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não poderá ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => deleteLead(item.id)}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Dashboard;
