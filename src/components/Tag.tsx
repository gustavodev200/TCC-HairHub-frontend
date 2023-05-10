import { Tag } from "antd";

interface TagProps {
  tag: string;
  color: string;
}

export const TagColor = ({ tag, color }: TagProps) => {
  return <Tag color={color}>{tag.toUpperCase()}</Tag>;
};
