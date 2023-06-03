"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "antd";
import { GenericStatus } from "@/@types/genericStatus";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { SchedulesTable } from "./components/SchedulesTable";
import { ModalSchedule } from "./components/ModalSchedule";
import { PageHeaderSchedule } from "./components/PageHeaderSchedule";
import { ScheduleStatus } from "@/@types/scheduleStatus";

const Page: React.FC = () => {
  //   const [search, setSearch] = useState("");
  //   const [page, setPage] = useState(1);
  //   const [statusFilter, setStatusFilter] = useState<GenericStatus | "all">(
  //     "all"
  //   );

  //   const { data } = useQuery(["schedules", page, statusFilter, search], {
  //     queryFn: () =>
  //       categoryService.getPaginated({
  //         filterByStatus: statusFilter !== "all" ? statusFilter : undefined,
  //         query: search,
  //         page,
  //       }),
  //     staleTime: Infinity,
  //   });

  const data: ScheduleOutputDTO[] = [
    {
      id: "1",
      client_id: "Gustavo Lage",
      employee_id: "Carlin Corte",
      start_time: "08:00",
      end_time: "09:00",
      services: ["Degradê Style"],
      estimated_time: 30,
      schedule_status: ScheduleStatus.CONFIRMED,
    },
  ];

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
        statusFilter={"all"}
        onChangeSearch={(value) => value}
        onChangeStatusFilter={(value) => value}
        handleOpenModal={handleOpenModalSchedule}
      />

      <SchedulesTable schedules={data} onEdit={handleOpenModalSchedule} />
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
            // current={page}
            // total={data.totalPages * 10}
            // onChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </>
  );
};

export default Page;
