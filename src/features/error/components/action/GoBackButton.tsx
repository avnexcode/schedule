import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export const GoBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoBack}
      className="flex items-center gap-2"
    >
      <ArrowLeft size={16} />
      Kembali ke Halaman Sebelumnya
    </Button>
  );
};
