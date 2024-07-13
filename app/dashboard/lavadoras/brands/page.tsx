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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Trash2 } from "lucide-react";
import Loader from "@/components/loader";

interface WasherBrand {
  id: number;
  nomeMarca: string;
}

const BrandsWasher = () => {
  const { toast } = useToast();
  const [washerBrand, setWasherBrand] = useState<WasherBrand[]>([]);
  const [nomeMarca, setNomeMarca] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const getWasherBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/washerBrand");
      setWasherBrand(response.data);
    } catch (e) {
      console.error("Erro ao buscar marcas:", e);
      toast({
        variant: "destructive",
        title: "Erro ao buscar marcas!",
        description: "Ocorreu um erro ao buscar as marcasa.",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Usar e.currentTarget para garantir que seja um HTMLFormElement
    const input = form.elements.namedItem("name") as HTMLInputElement;

    const body = {
      id: washerBrand.length + 1,
      nomeMarca: input.value,
    };

    if (input.value !== "") {
      try {
        await axios.post("http://localhost:8000/washerBrand", body);
        toast({
          variant: "default",
          title: "Marca adicionada com sucesso!",
        });
        getWasherBrands();
        setNomeMarca("");
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

  const updateWasherBrand = async (id: number, nomeMarca: string) => {
    try {
      await axios.put(`http://localhost:8000/washerBrand/${id}`, {
        id,
        nomeMarca,
      });

      console.log(id, nomeMarca);
      toast({
        variant: "default",
        title: "Marca atualizada com sucesso!",
      });
      getWasherBrands();
    } catch (error) {
      console.error("Erro ao atualizar marca:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar marca!",
        description: "Ocorreu um erro ao atualizar a marcass.",
      });
    }
  };

  const deleteWasherBrand = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/washerBrand/${id}`);
      toast({
        variant: "destructive",
        title: "Marca removida com sucesso!",
      });
      getWasherBrands(); // Atualiza a lista de marcas
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
    getWasherBrands();
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
              <BreadcrumbLink href="/components">Lavadoras</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Marcas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col  md:flex-row justify-between mt-10 gap-4">
        <div className="flex flex-col antialiased">
          <h3 className="font-bold text-xl md:text-2xl">Marcas de Lavadoras</h3>
          <p className=" text-base md:text-lg text-gray-400">
            Gerencie as marcas das Lavadoras disponíveis no seu estoque
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="primary">+ Nova marca</Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Nova marca de lavadora</DialogTitle>
              <DialogDescription>
                Preencha os campos para cadastrar uma nova marca de lavadora.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={saveData}>
              <div className="flex flex-col justify-start items-center gap-4 py-4 w-full">
                <div className="flex flex-col w-full gap-2">
                  <Label htmlFor="name" className="">
                    Nome da marca:
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    value={nomeMarca}
                    onChange={(e) => setNomeMarca(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" variant="primary">
                  Cadastrar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table className="mt-14 bg-gray-200/30 rounded-lg">
        <TableCaption className="text-gray-400">
          Listagem das marcas de lavadoras
        </TableCaption>
        <TableHeader className="bg-zinc-900">
          <TableRow className="">
            <TableHead className="w-[70px] font-bold text-white">#</TableHead>
            <TableHead className="font-bold text-white">Nome</TableHead>
            <TableHead className="text-right font-bold text-white">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {washerBrand.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.nomeMarca}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Edit size={16} />
                      </Button>
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
                          updateWasherBrand(item.id, input.value);
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
                              defaultValue={item.nomeMarca}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter className="gap-2">
                          <Button
                            variant="primary"
                            type="submit"
                            // onClick={() => {
                            //   const input = document.getElementById(
                            //     `name-${item.id}`
                            //   ) as HTMLInputElement;
                            //   updateWasherBrand(item.id, input.value)
                            //     .then(() => {
                            //       toast({
                            //         variant: "default",
                            //         title: "Marca atualizada com sucesso!",
                            //       });
                            //     })
                            //     .catch(() => {
                            //       toast({
                            //         variant: "destructive",
                            //         title: "Erro ao atualizar marca!",
                            //         description:
                            //           "Ocorreu um erro ao atualizar a marca.",
                            //       });
                            //     });
                            // }}
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
                          onClick={() => deleteWasherBrand(item.id)}
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

export default BrandsWasher;
