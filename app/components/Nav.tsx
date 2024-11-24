"use client";

import Link from "next/link";
import React from "react";
import { DiscordIcon } from "../page";
import { useParams, usePathname } from "next/navigation";
import jonan from "@/public/jonan.webp";
import minions from "@/public/minions.webp";
import target from "@/public/target.webp";
import programmerhub from "@/public/programmerhub.webp";
import warzone from "@/public/warzone.webp";
import Image from "next/image";

interface NavProps {
  children: React.ReactNode;
}

const Nav = ({ children }: NavProps) => {
  return (
    <div className="flex text-gray-100 h-screen">
      <div className="bg-gray-900 p-3  overflow-y-scroll scrollbar-hide flex flex-col gap-y-2">
        <NavLink href="/">
          <DiscordIcon className="size-7" />
        </NavLink>

        <hr className="border-t-white/[.06] border-t-2 rounded mx-2" />

        <NavLink href="/servers/1/channels/1" serverNo={1}>
          <Image src={jonan} alt="Jonan" />
        </NavLink>

        <NavLink href="/servers/2/channels/17" serverNo={2}>
          <Image src={minions} alt="Minions" />
        </NavLink>

        <NavLink href="/servers/3/channels/28" serverNo={3}>
          <Image src={target} alt="Target" />
        </NavLink>

        <NavLink href="/servers/4" serverNo={4}>
          <Image src={programmerhub} alt="Programmerhub" />
        </NavLink>

        <NavLink href="/servers/5" serverNo={5}>
          <Image src={warzone} alt="Warzone" />
        </NavLink>
      </div>
      {children}
    </div>
  );
};

export default Nav;

interface NavLinkProps {
  children?: React.ReactNode;
  href: string;
  serverNo?: number;
}

function NavLink({ children, href, serverNo }: NavLinkProps) {
  const pathname = usePathname();
  const { id } = useParams();

  // Check if this is the home/root link and if we're currently on the home path
  const isHomeActive = href === "/" && pathname === "/";
  // Check if this is a server link and if it matches the current server
  const isServerActive = serverNo && +id! === serverNo;

  return (
    <Link href={href}>
      <div className="relative group">
        <div className="flex absolute -left-3 h-full items-center">
          <div
            className={`${
              isHomeActive || isServerActive
                ? "h-10"
                : "h-5 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100"
            } bg-white w-1  rounded-r  transition-all duration-200   origin-left`}
          ></div>
        </div>
        <div
          className={`${
            isHomeActive || isServerActive
              ? "rounded-2xl bg-brand text-white"
              : "group-hover:bg-brand group-hover:text-white transition-all duration-300 text-gray-100 bg-gray-700 rounded-3xl"
          }  size-12   group-hover:rounded-2xl flex items-center justify-center transition-all  group-active:translate-y-px overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </Link>
  );
}
