import { useRouter } from "next/router";

export const useUpdateQuery = <
  SortParams extends string = string,
  OrderParams extends string = string,
>() => {
  const router = useRouter();

  const queryParams = {
    search: (router.query.search as string) || "",
    page: Number(router.query.page) || 1,
    sort: (router.query.sort as SortParams) || undefined,
    order: (router.query.order as OrderParams) || undefined,
    limit: Number(router.query.limit) || 15,
  };

  const handleUpdateQuery = (newParams: Partial<typeof queryParams>) => {
    void router.push(
      {
        href: router.asPath,
        pathname: router.pathname,
        query: {
          ...router.query,
          ...newParams,
        },
      },
      undefined,
      { scroll: false },
    );
  };

  return { queryParams, handleUpdateQuery };
};

// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { useCallback, useMemo } from "react";

// export const useUpdateQuery = <
//   SortParams extends string = string,
//   OrderParams extends string = string,
// >() => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();

//   const queryParams = useMemo(() => {
//     return {
//       search: searchParams.get("search") ?? "",
//       page: Number(searchParams.get("page")) || 1,
//       sort: (searchParams.get("sort") as SortParams) || undefined,
//       order: (searchParams.get("order") as OrderParams) || undefined,
//       limit: Number(searchParams.get("limit")) || 15,
//     };
//   }, [searchParams]);

//   const handleUpdateQuery = useCallback(
//     (newParams: Partial<typeof queryParams>) => {
//       const params = new URLSearchParams(searchParams.toString());

//       Object.entries(newParams).forEach(([key, value]) => {
//         if (value === undefined || value === "") {
//           params.delete(key);
//         } else {
//           params.set(key, String(value));
//         }
//       });

//       const newUrl = `${pathname}?${params.toString()}`;

//       router.push(newUrl, { scroll: false });
//     },
//     [router, searchParams, pathname],
//   );

//   return { queryParams, handleUpdateQuery };
// };
