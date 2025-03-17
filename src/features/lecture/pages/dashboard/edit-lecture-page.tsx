import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { EditLectureForm } from "../../forms";

export const EditLecturePageSSR: GetServerSideProps = async ({
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

type EditLecturePageProps = {
  sidebarDefaultOpen: boolean;
  id: string;
};

export const EditLecturePage = ({ id }: EditLecturePageProps) => {
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Edit Lecture"
          description="Update lecture data"
        >
          <EditLectureForm lectureId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

EditLecturePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as EditLecturePageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
