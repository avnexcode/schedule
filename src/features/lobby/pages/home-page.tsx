import { ThemeToggle } from "@/components/actions";
import { PageContainer, SectionContainer } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";

export const HomePage = () => {
  return (
    <PageContainer>
      <SectionContainer className="flex h-screen max-h-screen flex-col items-center justify-center gap-y-10 px-6">
        <div className="absolute right-2 top-2">
          <ThemeToggle />
        </div>
        <header className="flex flex-col items-center justify-center gap-y-3 text-center">
          <Heading size="h1" className="text-4xl font-bold">
            Welcome To My Schedule App
          </Heading>
          <Heading size="h3" className="text-lg">
            Make it Simple
          </Heading>
        </header>

        <main className="flex gap-x-5">
          <Link href="/schedule">
            <Button variant={"default"} className="w-[200px]">
              Lihat Jadwal
            </Button>
          </Link>
          <Link href="/home-work">
            <Button variant={"secondary"} className="w-[200px]">
              Lihat Tugas
            </Button>
          </Link>
        </main>
      </SectionContainer>
    </PageContainer>
  );
};
