"use client";
import {
  BlocksIcon,
  LogOutIcon,
  MenuIcon,
  Users,
  WashingMachineIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Sidenav = () => {
  return (
    <>
      <div className="flex w-full h-full flex-col border-r lg:block dark:bg-gray-800/40">
        <div className=" flex h-20 items-center justify-between px-4 md:h-20 w-screen md:w-full bg-slate-900">
          <div className=" text-white md:w-40">
            <img
              className="flex w-auto h-auto "
              src="/assets/images/equipacare-logo.png"
              alt="logo"
            />
          </div>

          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger className="text-[#A7B928]">
                <MenuIcon size={42} />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <img
                      src="/assets/images/logo-equipacare-dark.png"
                      alt="logo"
                    />
                  </SheetTitle>
                  <SheetDescription>Portal administrativo</SheetDescription>

                  <ul className="antialiased flex flex-col md:flex-col gap-3 mt-4">
                    <li>
                      <small className="flex gap-2 mb-3">Dashboard</small>
                      <Link
                        className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                        href="/dashboard/"
                      >
                        <SheetClose className="flex gap-2 w-full">
                          <Users size={18} /> Leads
                        </SheetClose>
                      </Link>
                    </li>
                    <li className="flex flex-col">
                      <small className="flex gap-2 mb-3">Produtos</small>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="p-3 font-bold text-sm flex gap-2">
                            Autoclaves
                          </AccordionTrigger>
                          <AccordionContent>
                            <Link
                              className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                              href="/dashboard/autoclaves/brands"
                            >
                              <SheetClose className="flex gap-2 w-full">
                                <BlocksIcon size={18} /> Marcas
                              </SheetClose>
                            </Link>
                            <Link
                              className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                              href="/dashboard/autoclaves/models"
                            >
                              <SheetClose className="flex gap-2 w-full">
                                <BlocksIcon size={18} /> Modelos
                              </SheetClose>
                            </Link>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                    <li>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="  p-3 font-bold text-sm flex gap-2">
                            Lavadoras
                          </AccordionTrigger>
                          <AccordionContent>
                            <Link
                              className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                              href="/dashboard/lavadoras/brands"
                            >
                              {" "}
                              <SheetClose className="flex gap-2 w-full">
                                <WashingMachineIcon size={18} /> Marcas
                              </SheetClose>
                            </Link>
                            <Link
                              className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                              href="/dashboard/lavadoras/models"
                            >
                              {" "}
                              <SheetClose className="flex gap-2 w-full">
                                <WashingMachineIcon size={18} /> Modelos
                              </SheetClose>
                            </Link>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>

                    <li className="hidden md:block">
                      <Link
                        className=" hover:bg-red-400 hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-bold text-sm text-red-400 flex gap-2 md:mt-20 md:fixed md:bottom-10  md:w-64"
                        href="/"
                      >
                        <LogOutIcon size={18} /> Sair
                      </Link>
                    </li>
                  </ul>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="hidden md:flex md:flex-col ml-4  bg-gray-50 mt-8">
          <ul className="antialiased flex md:flex-col gap-3">
            <li>
              <small className="flex gap-2 mb-3">Dashboard</small>
              <Link
                className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                href="/dashboard/"
              >
                <Users size={18} /> Leads
              </Link>
            </li>
            <li className="flex flex-col">
              <small className="flex gap-2 mb-3">Produtos</small>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="p-3 font-bold text-sm flex gap-2">
                    Autoclaves
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                      href="/dashboard/autoclaves/brands"
                    >
                      <BlocksIcon size={18} /> Marcas
                    </Link>
                    <Link
                      className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                      href="/dashboard/autoclaves/models"
                    >
                      <BlocksIcon size={18} /> Modelos
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            <li>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="  p-3 font-bold text-sm flex gap-2">
                    Lavadoras
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                      href="/dashboard/lavadoras/brands"
                    >
                      <WashingMachineIcon size={18} /> Marcas
                    </Link>
                    <Link
                      className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                      href="/dashboard/lavadoras/models"
                    >
                      <WashingMachineIcon size={18} /> Modelos
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>

            <li className="hidden md:block">
              <Link
                className=" hover:bg-red-400 hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-bold text-sm text-red-400 flex gap-2 md:mt-20 md:fixed md:bottom-10  md:w-64"
                href="/"
              >
                <LogOutIcon size={18} /> Sair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
