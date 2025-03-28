import {
  TableLimit,
  TablePagination,
  TableSearch,
} from "@/components/fragments";
import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks";
import { api } from "@/utils";
import { CirclePlus } from "lucide-react";
import { type GetServerSideProps } from "next";
import Link from "next/link";
import {
  LectureSort,
  type LectureOrderParams,
  type LectureSortParams,
} from "../../components/action";
import { LectureTable } from "../../tables";

export const LecturePageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type LecturePageProps = {
  sidebarDefaultOpen: boolean;
};

export const LecturePage = () => {
  const { queryParams, handleUpdateQuery } = useQueryParams<
    LectureSortParams,
    LectureOrderParams
  >();

  const { data: lectures, isLoading: isLecturesLoading } =
    api.lecture.getAll.useQuery(
      {
        params: { ...queryParams },
      },
      { refetchOnWindowFocus: false },
    );

  return (
    <PageContainer title="">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Lecture"
          description="Manage lecture data"
        >
          <header className="flex flex-col gap-y-5 py-10">
            <div className="flex items-center gap-x-5">
              <Link href={"/dashboard/lecture/create"}>
                <Button className="min-w-[150px]">
                  <CirclePlus />
                  Add Lecture
                </Button>
              </Link>

              <TableSearch
                placeholder="lecture"
                initialSearch={queryParams.search}
                onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
              />
            </div>

            <div className="flex items-center gap-5">
              <TableLimit
                currentLimit={queryParams.limit}
                onLimitChange={(limit) => handleUpdateQuery({ limit, page: 1 })}
              />

              <LectureSort
                currentSort={queryParams.sort}
                currentOrder={queryParams.order}
                onSortChange={(sort) => handleUpdateQuery({ sort })}
                onOrderChange={(order) => handleUpdateQuery({ order })}
              />
            </div>
          </header>

          <main>
            <LectureTable
              lectures={lectures?.data}
              isLecturesLoading={isLecturesLoading}
            />
          </main>

          <footer className="py-5">
            <TablePagination
              total={lectures?.meta.total ?? 0}
              currentPage={queryParams.page}
              limit={queryParams.limit}
              onPageChange={(page) => handleUpdateQuery({ page })}
            />
          </footer>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

LecturePage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as LecturePageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
