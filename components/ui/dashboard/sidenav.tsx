import {
  BlocksIcon,
  LogOutIcon,
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

const Sidenav = () => {
  return (
    <>
      <div className="flex w-full h-full flex-col  border-r  lg:block dark:bg-gray-800/40">
        <Link
          className="mb-5 flex h-20 items-center justify-around md:h-20 w-screen md:w-full bg-slate-900"
          href="/"
        >
          <div className=" text-white md:w-40">
            <img
              className="flex w-auto h-auto "
              src="/assets/images/equipacare-logo.png"
              alt="logo"
            />
          </div>
          <div className="text-white flex gap-2 bg-slate-800 p-3 rounded-lg md:hidden">
            <LogOutIcon className="text-red-500" />
            Sair
          </div>
        </Link>
        <div className="ml-4  bg-gray-50 mt-8">
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
                      href="/dashboard/autoclaves/categories"
                    >
                      <WashingMachineIcon size={18} /> Marcas
                    </Link>
                    <Link
                      className="hover:bg-[#A7B928] hover:text-white transition-all duration-500 ease-in-out rounded-md p-3 font-semibold text-slate-800 text-sm flex gap-2"
                      href="/dashboard/autoclaves/models"
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
