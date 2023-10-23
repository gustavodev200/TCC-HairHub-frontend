"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

import { ScheduleOutputDTO } from "@/@types/schedules";
import { SchedulesTable } from "./components/SchedulesTable";
import { ModalSchedule } from "./components/ModalSchedule";
import { PageHeaderSchedule } from "./components/PageHeaderSchedule";
import { ScheduleStatus } from "@/@types/scheduleStatus";
import { scheduleService } from "@/services/schedule";
import dayjs, { Dayjs } from "dayjs";
import ConsumeModal from "./components/ConsumeModal";
import { ConsumptionOutputDTO } from "@/@types/Consumption";

const Page: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<ScheduleStatus | "all">(
    "all"
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedBarberId, setSelectedBarberId] = useState("");

  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["schedulings", statusFilter, page, selectedDate, selectedBarberId],
    {
      queryFn: () =>
        scheduleService.getPaginated({
          filterByStatus: statusFilter !== "all" ? statusFilter : undefined,
          filterByDate: selectedDate?.toISOString() || undefined,
          filterByEmployee: selectedBarberId || undefined,
          page,
          query: search,
        }),

      onSuccess: () => {
        queryClient.invalidateQueries(["schedulings"], {
          exact: true,
        });
      },
    }
  );

  const [scheduleToEdit, setScheduleToEdit] = useState<ScheduleOutputDTO>();
  const [showModalSchedule, setShowModalSchedule] = useState(false);
  const [selectedConsumeScheduleId, setSelectedConsumeScheduleId] =
    useState<string>();
  const [showModalConsumeSchedule, setShowModalConsumeSchedule] =
    useState(false);

  const handleOpenModalSchedule = (schedule?: ScheduleOutputDTO) => {
    if (schedule) {
      setScheduleToEdit(schedule);
    }

    setShowModalSchedule(true);
  };

  const handleOpenModalScheduleConsume = (id?: string) => {
    if (id) {
      setSelectedConsumeScheduleId(id);
    }

    setShowModalConsumeSchedule(true);
  };

  const handleCloseModalSchedule = () => {
    setShowModalSchedule(false), setShowModalConsumeSchedule(false);

    if (scheduleToEdit) {
      setScheduleToEdit(undefined);
    }
  };

  return (
    <>
      <ModalSchedule
        open={showModalSchedule}
        scheduleToEdit={scheduleToEdit}
        onClose={handleCloseModalSchedule}
      />

      <ConsumeModal
        open={showModalConsumeSchedule}
        onClose={handleCloseModalSchedule}
        selectedConsumeScheduleId={data?.data.find(
          (schedule) => schedule.id === selectedConsumeScheduleId
        )}
      />

      <PageHeaderSchedule
        pageTitle="Agendamentos"
        statusFilter={statusFilter}
        selectedBarberId={selectedBarberId}
        onChangeSelectedBarberId={setSelectedBarberId}
        selectedDate={selectedDate}
        onChangeSelectedDate={setSelectedDate}
        onChangeSearch={(value) => value}
        onChangeStatusFilter={(value) => setStatusFilter(value)}
        handleOpenModal={handleOpenModalSchedule}
        schedules={data?.data ?? []}
      />

      <SchedulesTable
        schedules={data?.data ?? []}
        onEdit={handleOpenModalSchedule}
        handleOpenModalScheduleConsume={handleOpenModalScheduleConsume}
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
