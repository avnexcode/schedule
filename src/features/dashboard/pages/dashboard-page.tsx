import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";

import { type GetServerSideProps } from "next";
import { DashboardBadge } from "../components";

export const DashboardPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type DashboardPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardPage = () => {
  return (
    <PageContainer title="Dashboard">
      <SectionContainer padded>
        <DashboardSection title="Dashboard">
          <main className="grid grid-cols-1 justify-items-center gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            <DashboardBadge />
            <DashboardBadge />
            <DashboardBadge />
            <DashboardBadge />
            <DashboardBadge />
            <DashboardBadge />
          </main>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
