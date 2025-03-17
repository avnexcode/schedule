import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { CreateLectureForm } from "../../forms";

export const CreateLecturePageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type CreateLecturePageProps = {
  sidebarDefaultOpen: boolean;
};

export const CreateLecturePage = () => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Create Lecture"
          description="Add new lecture data"
        >
          <CreateLectureForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

CreateLecturePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as CreateLecturePageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
