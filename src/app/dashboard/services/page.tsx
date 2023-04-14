"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "./components/PageHeader";
import { ServicesTable } from "./components/ServicesTable";
import { GenericStatus } from "@/@types/genericStatus";
import { serviceApi } from "@/services/service";
import { Pagination } from "antd";

const Page: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<GenericStatus | "all">(
    "all"
  );

  const { data } = useQuery(["services", page, statusFilter, search], {
    queryFn: () =>
      serviceApi.getPaginated({
        filterByStatus: statusFilter !== "all" ? statusFilter : undefined,
        query: search,
        page,
      }),
  });
  return (
    <div>
      <PageHeader />
      <ServicesTable services={data?.data ?? []} />
      {data && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          <Pagination
            hideOnSinglePage
            responsive
            current={page}
            total={data.totalPages * 10}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
