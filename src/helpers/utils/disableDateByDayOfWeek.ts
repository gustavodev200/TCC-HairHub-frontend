import dayjs, { Dayjs } from "dayjs";

export function disableDateByDayOfWeek(
  current: Dayjs,
  validDaysOfWeek: number[],
  disablePast?: boolean
) {
  const isDisableByDayOfWeek = !validDaysOfWeek.some(
    (date) => date === dayjs(current).day()
  );
  const isDisableByPast =
    (disablePast && dayjs(current).isBefore(dayjs())) ?? false;
  return isDisableByDayOfWeek || isDisableByPast;
}
