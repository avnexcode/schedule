import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { CreateMajorForm } from "../../forms";

export const CreateMajorPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type CreateMajorPageProps = {
  sidebarDefaultOpen: boolean;
};

export const CreateMajorPage = () => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Create Major"
          description="Add new major data"
        >
          <CreateMajorForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateMajorPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as CreateMajorPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
