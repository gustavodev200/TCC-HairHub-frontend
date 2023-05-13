"use client";
import { Employee } from "@/@types/employee";
import { GenericStatus } from "@/@types/genericStatus";
import { PageHeader } from "@/components/PageHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useState } from "react";
import { EmployeeTable } from "./components/EmployeeTable";
import { employeeService } from "@/services/employee";
import { InfoModal } from "./components/InfoModal";
import { EmployeeDialogForm } from "./components/ModalEmployee";

const Page: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<GenericStatus | "all">(
    "all"
  );

  const { data } = useQuery(["employees", page, statusFilter, search], {
    queryFn: () =>
      employeeService.getPaginated({
        filterByStatus: statusFilter !== "all" ? statusFilter : undefined,
        query: search,
        page,
      }),
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();

  const resetPassword = useMutation({
    mutationFn: (id: string) => employeeService.resetPassword(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["employees"]);
    },
  });

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>();
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee>();
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalInfoEmployee, setShowModalInfoEmployee] = useState(false);

  const handleOpenModalInfoEmployee = (id?: string) => {
    if (id) {
      setSelectedEmployeeId(id);
    }
    setShowModalInfoEmployee(true);
  };

  const handleOpenModalEmployee = (employee?: Employee) => {
    if (employee) {
      setEmployeeToEdit(employee);
    }

    setShowModalEmployee(true);
  };

  const handleCloseModalEmployee = () => {
    setShowModalEmployee(false), setShowModalInfoEmployee(false);

    if (employeeToEdit) {
      setEmployeeToEdit(undefined);
    }
  };

  return (
    <>
      <EmployeeDialogForm
        open={showModalEmployee}
        employeeToEdit={employeeToEdit}
        onClose={handleCloseModalEmployee}
      />

      <InfoModal
        open={showModalInfoEmployee}
        onClose={handleCloseModalEmployee}
        employeeInfo={data?.data.find(
          (employee) => employee.id === selectedEmployeeId
        )}
      />

      <PageHeader
        pageTitle="Colaboradores"
        statusFilter={statusFilter}
        onChangeSearch={(value) => setSearch(value)}
        onChangeStatusFilter={(value) => setStatusFilter(value)}
        handleOpenModal={handleOpenModalEmployee}
      />
      <EmployeeTable
        employees={data?.data ?? []}
        onEdit={handleOpenModalEmployee}
        handleOpenModalInfoEmployee={handleOpenModalInfoEmployee}
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
