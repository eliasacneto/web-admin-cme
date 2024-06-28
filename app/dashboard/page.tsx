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

interface Lead {
  id: number;
  leadName: string;
  hospitalName: string;
  customer: string;
  hospitalContact: string;
  city: string;
  state: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [lead, setLead] = useState<Lead[]>([]);
  const [newLead, setNewLead] = useState<string>("");

  const getLead = async () => {
    try {
      const response = await axios.get("http://localhost:8000/lead");
      setLead(response.data);
    } catch (e) {
      console.error("Erro ao buscar leads:", e);
      toast({
        variant: "destructive",
        title: "Erro ao buscar leads!",
        description: "Ocorreu um erro ao buscar seus leads.",
      });
    }
  };

  const saveLead = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget; // Usar e.currentTarget para garantir que seja um HTMLFormElement
    const input = form.elements.namedItem("name") as HTMLInputElement;

    const body = {
      id: lead.length + 1,
      customer: input.value,
      hospitalName: input.value,
      hospitalContact: input.value,
      city: input.value,
      state: input.value,
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

  const updateLead = async (id: number, customer: string) => {
    try {
      await axios.put(`http://localhost:8000/lead/${id}`, {
        id,
        customer,
      }); // Passando id e brandName no corpo da requisição

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
                    <Label htmlFor="name" className="">
                      Nome completo:
                    </Label>
                    <Input
                      id="name"
                      defaultValue=""
                      className="col-span-3"
                      value={newLead}
                      onChange={(e) => setNewLead(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="username" className="">
                      E-mail do hospital:
                    </Label>
                    <Input
                      id="username"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="username" className="">
                      Contato:
                    </Label>
                    <Input
                      id="username"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="username" className="">
                    Nome do hospital:
                  </Label>
                  <Input id="username" defaultValue="" className="col-span-3" />
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="username" className="">
                      CNPJ:
                    </Label>
                    <Input
                      id="username"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="username" className="">
                      Cargo atual:
                    </Label>
                    <Input
                      id="username"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="username" className="">
                      CEP:
                    </Label>
                    <Input
                      id="username"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="username" className="">
                      Número:
                    </Label>
                    <Input
                      id="username"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="username" className="">
                    Avenida:
                  </Label>
                  <Input id="username" defaultValue="" className="col-span-3" />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="username" className="">
                    Bairro:
                  </Label>
                  <Input id="username" defaultValue="" className="col-span-3" />
                </div>
                <div className="flex justify-between items-center gap-4 w-full">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="username" className="">
                      Cidade:
                    </Label>
                    <Input
                      id="username"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="username" className="">
                      UF:
                    </Label>
                    <Input
                      id="username"
                      defaultValue=""
                      className="col-span-3"
                    />
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
              <TableCell>{item.hospitalName}</TableCell>
              <TableCell>{item.customer}</TableCell>
              <TableCell>{item.hospitalContact}</TableCell>
              <TableCell>{item.city}</TableCell>
              <TableCell className="w-[70px]">{item.state}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <Eye size={18} />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateLead(item.id, item.leadName)}
                      >
                        <Edit size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Lead</DialogTitle>
                        <DialogDescription>
                          Altere as informações do seu lead
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          const form = e.currentTarget;
                          const input = form.elements.namedItem(
                            `name-${item.id}`
                          ) as HTMLInputElement;
                          updateLead(item.id, input.value);
                        }}
                      >
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor={`name-${item.id}`}
                              className="text-right"
                            >
                              Nome:
                            </Label>
                            <Input
                              id={`name-${item.id}`}
                              defaultValue={item.customer}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter className="gap-2">
                          <Button
                            variant="primary"
                            onClick={() => {
                              const input = document.getElementById(
                                `name-${item.id}`
                              ) as HTMLInputElement;
                              updateLead(item.id, input.value)
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
                            }}
                          >
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
