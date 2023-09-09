import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

interface Shift {
  start_time: string;
  end_time: string;
}

interface DisabledTimes {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: () => number[];
}

export function disableTimeByShift(timeByShift: Shift[], selectedDate: Dayjs) {
  // Verifique se há um turno ativo para a data selecionada
  const isWithinShift = timeByShift.some((shift) => {
    const startTime = dayjs(shift.start_time, "HH:mm");
    const endTime = dayjs(shift.end_time, "HH:mm");

    // Certifique-se de comparar apenas a data, desconsiderando o horário
    const selectedDateOnly = selectedDate.startOf("day");

    return selectedDateOnly.isBetween(startTime, endTime, null, "[]");
  });

  if (isWithinShift) {
    // Se a data estiver dentro de um turno, permita todas as horas e minutos dentro do turno
    const selectedShift = timeByShift.find((shift) => {
      const startTime = dayjs(shift.start_time, "HH:mm");
      const endTime = dayjs(shift.end_time, "HH:mm");
      const selectedDateOnly = selectedDate.startOf("day");
      return selectedDateOnly.isBetween(startTime, endTime, null, "[]");
    });

    if (selectedShift) {
      const startHour = dayjs(selectedShift.start_time, "HH:mm").hour();
      const endHour = dayjs(selectedShift.end_time, "HH:mm").hour();
      const startMinute = dayjs(selectedShift.start_time, "HH:mm").minute();
      const endMinute = dayjs(selectedShift.end_time, "HH:mm").minute();

      return {
        disabledHours: () => {
          const hours = [];
          for (let i = 0; i < 24; i++) {
            if (i < startHour || i > endHour) {
              hours.push(i);
            }
          }
          return hours;
        },
        disabledMinutes: (hour: number) => {
          if (hour === startHour) {
            // Desabilite os minutos anteriores ao início do turno
            return [...Array(60).keys()].filter((min) => min < startMinute);
          }
          if (hour === endHour) {
            // Desabilite os minutos posteriores ao final do turno
            return [...Array(60).keys()].filter((min) => min >= endMinute);
          }
          return [];
        },
      };
    }
  } else {
    // Caso contrário, desabilite todas as horas e minutos
    return {
      disabledHours: () => [...Array(24).keys()],
      disabledMinutes: () => [...Array(60).keys()],
    };
  }
}
