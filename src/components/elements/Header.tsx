import Link from "next/link";
import { ThemeToggle } from "../actions/ThemeToggle";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { env } from "@/configs/env";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-5 py-3">
      <Link href={"/"}>
        <Heading size={"h3"}>{env.NEXT_PUBLIC_APP_NAME}</Heading>
      </Link>
      <div className="flex items-center gap-5">
        <Link href={"/login"}>
          <Button variant={"outline"} size={"sm"}>
            Login
          </Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant={"outline"} size={"sm"}>
            Dashboard
          </Button>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};
