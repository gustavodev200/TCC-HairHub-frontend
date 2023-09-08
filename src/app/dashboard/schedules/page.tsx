"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "antd";

import { ScheduleOutputDTO } from "@/@types/schedules";
import { SchedulesTable } from "./components/SchedulesTable";
import { ModalSchedule } from "./components/ModalSchedule";
import { PageHeaderSchedule } from "./components/PageHeaderSchedule";
import { ScheduleStatus } from "@/@types/scheduleStatus";
import { scheduleService } from "@/services/schedule";

const Page: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<ScheduleStatus | "all">(
    "all"
  );

  const queryClient = useQueryClient();

  const { data } = useQuery(["schedulings", page, statusFilter, search], {
    queryFn: () =>
      scheduleService.getPaginated({
        filterByStatus: statusFilter !== "all" ? statusFilter : undefined,
        query: search,
        page,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries(["schedulings"], {
        exact: true,
      });
    },
  });

  const [scheduleToEdit, setcheduleToEdit] = useState<ScheduleOutputDTO>();
  const [showModalCategory, setShowModalCategory] = useState(false);

  const handleOpenModalSchedule = (schedule?: ScheduleOutputDTO) => {
    if (schedule) {
      setcheduleToEdit(schedule);
    }

    setShowModalCategory(true);
  };

  const handleCloseModalSchedule = () => {
    setShowModalCategory(false);

    if (scheduleToEdit) {
      setcheduleToEdit(undefined);
    }
  };

  return (
    <>
      <ModalSchedule
        open={showModalCategory}
        scheduleToEdit={scheduleToEdit}
        onClose={handleCloseModalSchedule}
      />

      <PageHeaderSchedule
        pageTitle="Agendamentos"
        statusFilter={statusFilter}
        onChangeSearch={(value) => value}
        onChangeStatusFilter={(value) => value}
        handleOpenModal={handleOpenModalSchedule}
      />

      <SchedulesTable
        schedules={data?.data ?? []}
        onEdit={handleOpenModalSchedule}
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
