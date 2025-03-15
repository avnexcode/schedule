import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { EditSpecializationForm } from "../../forms";

export const EditSpecializationPageSSR: GetServerSideProps = async ({
  req,
  params,
}) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");
  const { id } = params as { id: string };

  return {
    props: { sidebarDefaultOpen, id },
  };
};

type EditSpecializationPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const EditSpecializationPage = ({ id }: EditSpecializationPageProps) => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Edit Specialization"
          description="Update specialization data"
        >
          <EditSpecializationForm specializationId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditSpecializationPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as EditSpecializationPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
