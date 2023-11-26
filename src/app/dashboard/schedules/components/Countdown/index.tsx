import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { TagColor } from "@/components/Tag";

interface CountdownProps {
  scheduledDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ scheduledDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = dayjs();
      const difference = dayjs(scheduledDate).diff(now);

      // Garante que o tempo restante nunca seja negativo
      const nonNegativeDifference = Math.max(difference, 0);

      setTimeRemaining(nonNegativeDifference);

      if (nonNegativeDifference > 2 * 24 * 60 * 60 * 1000) {
        setColor("green");
      } else if (nonNegativeDifference >= 24 * 60 * 60 * 1000) {
        setColor("gold");
      } else {
        setColor("red");
      }
    };

    const intervalId = setInterval(calculateTimeRemaining, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [scheduledDate]);

  const formatTime = (time: number): string => {
    // Se o tempo restante for menor que 24 horas, mostrar apenas as horas
    if (time < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(time / (60 * 60 * 1000));
      return `${hours} hora${hours !== 1 ? "s" : ""}`;
    }

    // Caso contrário, formatar como dias e horas
    const days = Math.floor(time / (24 * 60 * 60 * 1000));
    const hours = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

    const pluralize = (count: number, unit: string): string => {
      return count === 1 ? `${count} ${unit}` : `${count} ${unit}s`;
    };

    const formattedDays = pluralize(days, "dia");
    const formattedHours = pluralize(hours, "hora");

    return `${formattedDays} e ${formattedHours}`;
  };

  return <TagColor tag={formatTime(timeRemaining)} color={color} />;
};

export default Countdown;
