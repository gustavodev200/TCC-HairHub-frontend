"use client";
import { Employee, EmployeeInputDTO } from "@/@types/employee";
import { GenericStatus } from "@/@types/genericStatus";
import { PageHeader } from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useState } from "react";
import { EmployeeTable } from "./components/EmployeeTable";
import { employeeService } from "@/services/employee";
import { InfoModal } from "./components/InfoModal";

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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>();
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee>();
  const [showModalEmployee, setShowModalEmployee] = useState(false);

  const handleOpenModalEmployee = (id?: string) => {
    if (id) {
      setSelectedEmployeeId(id);
    }
    setShowModalEmployee(true);
  };

  const handleCloseModalEmployee = () => {
    setShowModalEmployee(false);

    if (employeeToEdit) {
      setEmployeeToEdit(undefined);
    }
  };

  return (
    <>
      {/* <ModalService
          open={showModalService}
          serviceToEdit={serviceToEdit}
          onClose={handleCloseModalService}
        /> */}

      <InfoModal
        open={showModalEmployee}
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
        onEdit={() => {}}
        handleOpenModalEmployee={handleOpenModalEmployee}
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
