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
  SpecializationLimit,
  SpecializationPagination,
  SpecializationSearch,
  SpecializationSort,
  type SpecializationOrderParams,
  type SpecializationSortParams,
} from "../../components/action";
import { SpecializationTable } from "../../tables";

export const SpecializationPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type SpecializationPageProps = {
  sidebarDefaultOpen: boolean;
};

export const SpecializationPage = () => {
  const { queryParams, handleUpdateQuery } = useUpdateQuery<
    SpecializationSortParams,
    SpecializationOrderParams
  >();

  const { data: specializations, isLoading: isSpecializationsLoading } =
    api.specialization.getAll.useQuery(
      { params: { ...queryParams } },
      { refetchOnWindowFocus: false },
    );
  return (
    <PageContainer>
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard - Specialization"
          description="Manage specialization data"
        >
          <header className="flex flex-col gap-y-5 py-10">
            <div className="flex items-center gap-x-5">
              <Link href={"/dashboard/specialization/create"}>
                <Button className="min-w-[150px]">
                  <CirclePlus />
                  Add Specialization
                </Button>
              </Link>

              <SpecializationSearch
                initialSearch={queryParams.search}
                onSearch={(search) => handleUpdateQuery({ search, page: 1 })}
              />
            </div>

            <div>
              <div className="flex items-center gap-5">
                <SpecializationLimit
                  currentLimit={queryParams.limit}
                  onLimitChange={(limit) =>
                    handleUpdateQuery({ limit, page: 1 })
                  }
                />

                <SpecializationSort
                  currentSort={queryParams.sort}
                  currentOrder={queryParams.order}
                  onSortChange={(sort) => handleUpdateQuery({ sort })}
                  onOrderChange={(order) => handleUpdateQuery({ order })}
                />
              </div>
            </div>
          </header>
          <main>
            <SpecializationTable
              specializations={specializations?.data}
              isSpecializationsLoading={isSpecializationsLoading}
            />
            <SpecializationPagination
              total={specializations?.meta.total ?? 0}
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

SpecializationPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as SpecializationPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
