import { ThemeToggle } from "@/components/actions";
import { PageContainer, SectionContainer } from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { motion } from "framer-motion";
import { env } from "@/configs/env";

export const HomePage = () => {
  return (
    <PageContainer>
      <SectionContainer className="relative flex h-screen max-h-screen flex-col items-center justify-center gap-y-10 px-6">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-y-3 text-center"
        >
          <Heading size="h1" className="text-5xl font-extrabold drop-shadow-lg">
            Welcome To {env.NEXT_PUBLIC_APP_NAME}
          </Heading>
          <Heading size="h3" className="text-lg font-medium text-gray-200">
            Plan Smart, Study Better
          </Heading>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex gap-x-5"
        >
          <Link href="/schedule">
            <Button
              variant={"default"}
              className="w-[200px] text-lg font-semibold shadow-md hover:shadow-lg"
            >
              📅 Lihat Jadwal
            </Button>
          </Link>
          <Link href="/home-work">
            <Button
              variant={"secondary"}
              className="w-[200px] text-lg font-semibold shadow-md hover:shadow-lg"
            >
              📝 Lihat Tugas
            </Button>
          </Link>
        </motion.main>
      </SectionContainer>
    </PageContainer>
  );
};
