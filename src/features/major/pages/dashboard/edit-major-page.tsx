import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { EditMajorForm } from "../../forms";

export const EditMajorPageSSR: GetServerSideProps = async ({ req, params }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  const { id } = params as { id: string };

  return {
    props: { sidebarDefaultOpen, id },
  };
};

type EditMajorPageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const EditMajorPage = ({ id }: EditMajorPageProps) => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Edit Major"
          description="Update major data"
        >
          <EditMajorForm majorId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditMajorPage.getLayout = (page: React.ReactElement<EditMajorPageProps>) => {
  const pageProps = page.props;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
