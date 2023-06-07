import { AvailableDays } from "@/@types/shifts";

export function getDayFromNumber(dayNumber: number): AvailableDays {
  switch (dayNumber) {
    case 0:
      return AvailableDays.MONDAY;
    case 1:
      return AvailableDays.TUESDAY;
    case 2:
      return AvailableDays.WEDNESDAY;
    case 3:
      return AvailableDays.THURSDAY;
    case 4:
      return AvailableDays.FRIDAY;
    case 5:
      return AvailableDays.SATURDAY;
    case 6:
      return AvailableDays.SUNDAY;
    default:
      throw new Error(`Numero inválido: ${dayNumber}`);
  }
}
