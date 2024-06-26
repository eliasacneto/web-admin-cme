"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface AutoclaveBrand {
  id: number;
  autoclaveBrand: string;
  brandName: string;
}

const CategoryAutoclaves = () => {
  const { toast } = useToast();
  const [autoclaveBrand, setAutoclaveBrand] = useState<AutoclaveBrand[]>([]);
  const [newBrand, setNewBrand] = useState<string>("");

  const getBrand = async () => {
    try {
      const response = await axios.get("http://localhost:8000/brand");
      setAutoclaveBrand(response.data);
    } catch (e) {
      console.error("Erro ao buscar marcas:", e);
      toast({
        variant: "destructive",
        title: "Erro ao buscar marcas!",
        description: "Ocorreu um erro ao buscar as marcas.",
      });
    }
  };

  const saveData = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget; // Usar e.currentTarget para garantir que seja um HTMLFormElement
    const input = form.elements.namedItem("name") as HTMLInputElement;

    const body = {
      id: autoclaveBrand.length + 1,
      brandName: input.value,
    };

    if (input.value !== "") {
      try {
        await axios.post("http://localhost:8000/brand", body);
        toast({
          variant: "default",
          title: "Marca adicionada com sucesso!",
        });
        getBrand();
        setNewBrand("");
      } catch (error) {
        console.error("Erro ao adicionar marca:", error);
        toast({
          variant: "destructive",
          title: "Erro ao adicionar marca!",
          description: "Ocorreu um erro ao adicionar a marca.",
        });
      }
    } else {
      alert("Não é possível salvar uma marca sem nome");
    }
  };

  const updateBrand = async (id: number, brandName: string) => {
    try {
      await axios.put(`http://localhost:8000/brand/${id}`, { id, brandName }); // Passando id e brandName no corpo da requisição
      toast({
        variant: "default",
        title: "Marca atualizada com sucesso!",
      });
      getBrand();
    } catch (error) {
      console.error("Erro ao atualizar marca:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar marca!",
        description: "Ocorreu um erro ao atualizar a marca.",
      });
    }
  };

  const deleteBrand = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/brand/${id}`);
      toast({
        variant: "destructive",
        title: "Marca removida com sucesso!",
      });
      getBrand(); // Atualiza a lista de marcas
    } catch (error) {
      console.error("Erro ao remover marca:", error);
      toast({
        variant: "destructive",
        title: "Erro ao remover marca!",
        description: "Ocorreu um erro ao remover a marca.",
      });
    }
  };

  useEffect(() => {
    getBrand();
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
              <BreadcrumbPage>Marcas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex justify-between mt-10">
        <h3 className="font-bold text-2xl">Marcas de autoclaves</h3>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="primary">+ Adicionar nova</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Nova marca de Autoclave</SheetTitle>
              <SheetDescription>
                Informe o nome da marca para adicionar uma nova Autoclave.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={saveData}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome:
                  </Label>
                  <Input
                    id="name"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <Button variant="primary" type="submit">
                  Cadastrar marca
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-10">
        {autoclaveBrand.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <div className="flex flex-col bg-gray-50 shadow-md hover:shadow-lg cursor-pointer items-center justify-around gap-4 py-5 md:w-72">
                <h3>imagem</h3>
                <h1 className="font-bold text-lg">{item.brandName}</h1>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar autoclave</DialogTitle>
                <DialogDescription>
                  Altere o nome da marca da Autoclave
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  const form = e.currentTarget;
                  const input = form.elements.namedItem(
                    `name-${item.id}`
                  ) as HTMLInputElement;
                  updateBrand(item.id, input.value);
                }}
              >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`name-${item.id}`} className="text-right">
                      Nome:
                    </Label>
                    <Input
                      id={`name-${item.id}`}
                      defaultValue={item.brandName}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter className="gap-2">
                  <Button
                    variant={"destructive"}
                    onClick={() => deleteBrand(item.id)}
                  >
                    Excluir
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => updateBrand(item.id, item.brandName)}
                  >
                    Atualizar
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
};

export default CategoryAutoclaves;
