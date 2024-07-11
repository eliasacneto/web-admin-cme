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

interface AutoclaveModel {
  id: number;
  autoclaveModelName: string;
  autoclaveBrandName: string;
  brandName: string;
}

const AutoclaveModelos = () => {
  const { toast } = useToast();
  const [autoclaveModel, setAutoclaveModel] = useState<AutoclaveModel[]>([]);
  const [newAutoclaveModel, setNewAutoclaveModel] = useState<string>("");

  const getAutoclaveModel = async () => {
    try {
      const response = await axios.get("http://localhost:8000/autoclaveModel");
      setAutoclaveModel(response.data);
    } catch (e) {
      console.error("Erro ao buscar modelos:", e);
      toast({
        variant: "destructive",
        title: "Erro ao buscar modelos!",
        description: "Ocorreu um erro ao buscar os modelos.",
      });
    }
  };

  useEffect(() => {
    getAutoclaveModel();
  }, []);

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
              {/* <form onSubmit={saveLead}> */}
              <DialogTitle>Novo modelo de autoclave</DialogTitle>
              <DialogDescription>
                Preencha os campos para cadastrar um novo modelo de autoclave.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col justify-start items-start gap-4 py-4">
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="autoclaveModel">Marca</Label>
                  <Select>
                    <SelectTrigger id="autoclaveModel">
                      <SelectValue placeholder="Selecione uma marca" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Marca A</SelectItem>
                      <SelectItem value="sveltekit">Marca B</SelectItem>
                      <SelectItem value="astro">Marca C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="name" className="">
                    Nome
                  </Label>
                  <Input id="name" defaultValue="" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="username" className="">
                    Volume total da câmara (L):
                  </Label>
                  <Input id="username" defaultValue="" className="col-span-3" />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="username" className="">
                    Volume útil da câmara (L):
                  </Label>
                  <Input id="username" defaultValue="" className="col-span-3" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="username" className="">
                  Tempo em minutos do total médio do ciclo de alta temperatura
                  incluindo secagem (capacidade máxima):
                </Label>
                <Input id="username" defaultValue="" className="col-span-3" />
              </div>
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="username" className="">
                    Tempo em minutos de Carga e Descarga:
                  </Label>
                  <Input id="username" defaultValue="" className="col-span-3" />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="username" className="">
                    Tempo em minutos para teste diário B&D:
                  </Label>
                  <Input id="username" defaultValue="" className="col-span-3" />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="username" className="">
                  Tempo em minutos para procedimento diário de aquecimento
                  máquina fria:
                </Label>
                <Input id="username" defaultValue="" className="col-span-3" />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="username" className="">
                  Preço:
                </Label>
                <Input id="username" defaultValue="" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button type="submit" variant="primary">
                Cadastrar
              </Button>
            </DialogFooter>
            {/* </form> */}
          </DialogContent>
        </Dialog>
      </div>

      {autoclaveModel.map((item) => (
        <Accordion type="single" collapsible key={item.id}>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold mt-10 text-zinc-800">
              {item.autoclaveBrandName}
            </AccordionTrigger>
            <AccordionContent>
              <Card className="w-full">
                <div className="flex items-center justify-between m-5">
                  <div className="flex gap-5 items-center">
                    <img
                      src="/assets/images/equipacare-fav.png"
                      alt="image"
                      width={42}
                    />
                    <h1 className="text-lg font-bold">
                      {item.autoclaveModelName}
                    </h1>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon">
                      <Eye size="18" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit2 size="16" />
                    </Button>

                    <Button variant="destructive" size="icon">
                      <Trash2 size="16" />
                    </Button>
                  </div>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default AutoclaveModelos;
