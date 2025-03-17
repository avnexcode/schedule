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
import { useUpdateQuery } from "@/hooks";
import { api } from "@/utils";
import { CirclePlus } from "lucide-react";
import { type GetServerSideProps } from "next";
import Link from "next/link";
import {
  MajorSort,
  type MajorOrderParams,
  type MajorSortParams,
} from "../../components/action";
import { MajorTable } from "../../tables";

export const MajorPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type MajorPageProps = {
  sidebarDefaultOpen: boolean;
};

export const MajorPage = () => {
  const { queryParams, handleUpdateQuery } = useUpdateQuery<
    MajorSortParams,
    MajorOrderParams
  >();

  const { data: majors, isLoading: isMajorsLoading } =
    api.major.getAll.useQuery(
      {
        params: { ...queryParams },
      },
      { refetchOnWindowFocus: false },
    );

  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Major"
          description="Manage major data"
        >
          <header className="flex flex-col gap-y-5 py-10">
            <div className="flex items-center gap-x-5">
              <Link href={"/dashboard/major/create"}>
                <Button className="min-w-[150px]">
                  <CirclePlus />
                  Add Major
                </Button>
              </Link>

              <TableSearch
                initialSearch={queryParams.search}
                onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
              />
            </div>

            <div>
              <div className="flex items-center gap-5">
                <TableLimit
                  currentLimit={queryParams.limit}
                  onLimitChange={(limit) =>
                    handleUpdateQuery({ limit, page: 1 })
                  }
                />

                <MajorSort
                  currentSort={queryParams.sort}
                  currentOrder={queryParams.order}
                  onSortChange={(sort) => handleUpdateQuery({ sort })}
                  onOrderChange={(order) => handleUpdateQuery({ order })}
                />
              </div>
            </div>
          </header>
          <main>
            <MajorTable
              majors={majors?.data}
              isMajorsLoading={isMajorsLoading}
            />
            <TablePagination
              total={majors?.meta.total ?? 0}
              currentPage={queryParams.page}
              limit={queryParams.limit}
              onPageChange={(page) => handleUpdateQuery({ page })}
            />
          </main>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

MajorPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as MajorPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
