import { PageContainer, SectionContainer } from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { ScheduleView } from "../components";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const SchedulePageSSR: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = (await res.json()) as Product;

  return {
    props: { products: data },
  };
};

type SchedulePageProps = {
  products: Product[];
};

export const SchedulePage = ({ products }: SchedulePageProps) => {
  console.log({ products });
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded>
        <ScheduleView />
      </SectionContainer>
    </PageContainer>
  );
};
