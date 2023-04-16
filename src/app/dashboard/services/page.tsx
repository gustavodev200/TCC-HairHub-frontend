"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "./components/PageHeader";
import { ServicesTable } from "./components/ServicesTable";
import { GenericStatus } from "@/@types/genericStatus";
import { serviceApi } from "@/services/service";
import { Pagination } from "antd";
import { ModalService } from "./components/ModalService";
import { IService } from "@/@types/service";

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

  const [serviceToEdit, setServiceToEdit] = useState<IService>();
  const [showModalService, setShowModalService] = useState(false);

  const handleOpenModalService = (service?: IService) => {
    if (service) {
      setServiceToEdit(service);
    }

    setShowModalService(true);
  };

  const handleCloseModalService = () => {
    setShowModalService(false);

    if (serviceToEdit) {
      setServiceToEdit(undefined);
    }
  };

  return (
    <>
      <ModalService
        open={showModalService}
        serviceToEdit={serviceToEdit}
        onClose={handleCloseModalService}
      />

      <PageHeader
        statusFilter={statusFilter}
        onChangeSearch={(value) => setSearch(value)}
        onChangeStatusFilter={(value) => setStatusFilter(value)}
        handleOpenModalService={handleOpenModalService}
      />
      <ServicesTable
        services={data?.data ?? []}
        onEdit={handleOpenModalService}
      />
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
    </>
  );
};

export default Page;
