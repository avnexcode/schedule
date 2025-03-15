import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { CreateSpecializationForm } from "../../forms";

export const CreateSpecializationPageSSR: GetServerSideProps = async ({
  req,
}) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type CreateSpecializationPageProps = {
  sidebarDefaultOpen: boolean;
};

export const CreateSpecializationPage = () => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Create Specialization"
          description="Add specialization data"
        >
          <CreateSpecializationForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateSpecializationPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as CreateSpecializationPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
