import { getQueryClient } from "@/helpers/utils/getQueryClient";
import { employeeService } from "@/services/employee";
import { Hydrate, dehydrate } from "@tanstack/react-query";

export const metadata = {
  title: "Colaboradores",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(["employees", 1, "all", ""], {
    queryFn: () => employeeService.getPaginated(),
  });

  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
}
