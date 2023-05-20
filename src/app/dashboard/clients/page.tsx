"use client";
import { Employee } from "@/@types/employee";
import { GenericStatus } from "@/@types/genericStatus";
import { PageHeader } from "@/components/PageHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useState } from "react";
import { employeeService } from "@/services/employee";
import { InfoModal } from "./components/InfoModal";
import { clientService } from "@/services/client";
import { Client } from "@/@types/client";
import { ClientDialogForm } from "./components/ModalClient";
import { ClientTable } from "./components/ClientTable";

const Page: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<GenericStatus | "all">(
    "all"
  );

  const { data } = useQuery(["clients", page, statusFilter, search], {
    queryFn: () =>
      clientService.getPaginated({
        filterByStatus: statusFilter !== "all" ? statusFilter : undefined,
        query: search,
        page,
      }),
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const resetPassword = useMutation({
    mutationFn: (id: string) => clientService.resetPassword(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["clients"]);
    },
  });

  const [selectedClientId, setSelectedClientId] = useState<string>();
  const [clientToEdit, setClientToEdit] = useState<Client>();
  const [showModalClient, setShowModalClient] = useState(false);
  const [showModalInfoClient, setShowModalInfoClient] = useState(false);

  const handleOpenModalInfoClient = (id?: string) => {
    if (id) {
      setSelectedClientId(id);
    }
    setShowModalInfoClient(true);
  };

  const handleOpenModalClient = (client?: Client) => {
    if (client) {
      setClientToEdit(client);
    }

    setShowModalClient(true);
  };

  const handleCloseModalClient = () => {
    setShowModalClient(false), setShowModalInfoClient(false);

    if (clientToEdit) {
      setClientToEdit(undefined);
    }
  };

  return (
    <>
      <ClientDialogForm
        open={showModalClient}
        clientToEdit={clientToEdit}
        onClose={handleCloseModalClient}
      />

      <InfoModal
        open={showModalInfoClient}
        onClose={handleCloseModalClient}
        clientInfo={data?.data.find((client) => client.id === selectedClientId)}
      />

      <PageHeader
        pageTitle="Clientes"
        statusFilter={statusFilter}
        onChangeSearch={(value) => setSearch(value)}
        onChangeStatusFilter={(value) => setStatusFilter(value)}
        handleOpenModal={handleOpenModalClient}
      />
      <ClientTable
        clients={data?.data ?? []}
        onEdit={handleOpenModalClient}
        handleOpenModalInfoClient={handleOpenModalInfoClient}
        resetPassword={(id) => resetPassword.mutate(id)}
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
