import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export const GoHomeButton = () => {
  const router = useRouter();

  const handleGoHome = () => {
    void router.push("/");
  };
  return (
    <Button variant="default" onClick={handleGoHome}>
      Kembali ke Beranda
    </Button>
  );
};
