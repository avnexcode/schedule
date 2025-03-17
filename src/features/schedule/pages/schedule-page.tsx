import { PageContainer, SectionContainer } from "@/components/layouts";
import { ScheduleView } from "../components";

export const SchedulePage = () => {
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded>
        <ScheduleView />
      </SectionContainer>
    </PageContainer>
  );
};
