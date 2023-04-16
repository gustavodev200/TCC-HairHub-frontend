import { getQueryClient } from "@/helpers/utils/getQueryClient";
import { serviceApi } from "@/services/service";
import { Hydrate, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "Serviços",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(["services", 1, "all", ""], {
    queryFn: () => serviceApi.getPaginated(),
  });

  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
}
