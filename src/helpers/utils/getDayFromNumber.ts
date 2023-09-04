import { AvailableDays } from "@/@types/shifts";

export function getDayFromNumber(dayNumber: number): AvailableDays {
  switch (dayNumber) {
    case 0:
      return AvailableDays.SUNDAY;
    case 1:
      return AvailableDays.MONDAY;
    case 2:
      return AvailableDays.TUESDAY;
    case 3:
      return AvailableDays.WEDNESDAY;
    case 4:
      return AvailableDays.THURSDAY;
    case 5:
      return AvailableDays.FRIDAY;
    case 6:
      return AvailableDays.SATURDAY;
    default:
      throw new Error(`Número inválido: ${dayNumber}`);
  }
}
