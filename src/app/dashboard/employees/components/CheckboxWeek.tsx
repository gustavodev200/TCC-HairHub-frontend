import { Checkbox } from "antd";

interface CheckboxWeekProps {
  day_of_week: string;
  value: number;
}

export const CheckboxWeek: React.FC<CheckboxWeekProps> = ({
  day_of_week,
  value,
}) => {
  return <Checkbox value={value}>{day_of_week}</Checkbox>;
};
