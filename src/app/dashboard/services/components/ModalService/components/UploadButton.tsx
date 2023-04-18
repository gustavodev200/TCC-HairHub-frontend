import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

type UploadButtonProps = {
  isLoading: boolean;
};

export const UploadButton: React.FC<UploadButtonProps> = (isLoading) => {
  return (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
};
