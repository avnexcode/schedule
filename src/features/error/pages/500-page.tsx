import { PageContainer, SectionContainer } from "@/components/layouts";
import { Heading } from "@/components/ui/heading";
import { GoBackButton, GoHomeButton } from "../components/action";

export const Error500Page = () => {
  return (
    <PageContainer>
      <SectionContainer
        container
        className="h-screen max-h-screen justify-center"
      >
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <span className="text-5xl">500</span>
          </div>

          <Heading size={"h3"} className="mb-3">
            Kesalahan Server
          </Heading>

          <p className="mb-8 max-w-md text-zinc-500 dark:text-zinc-400">
            Maaf, telah terjadi kesalahan pada server kami. Tim teknis kami
            sedang bekerja untuk menyelesaikan masalah ini.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <GoBackButton />
            <GoHomeButton />
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
};
