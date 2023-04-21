import "@/styles/Loading.css";
import Image from "next/image";

export const LoadingComponent = () => {
  return (
    <div className="loading">
      <Image
        priority
        src="/images/logo.svg"
        width={90}
        height={90}
        alt="Logo Hair Hub Barbershop"
      />
      <span className="loader"></span>
      <span className="loading_setence" style={{ textAlign: "center" }}>
        Pequenos passos hoje, grandes conquistas amanhã!
      </span>
    </div>
  );
};
