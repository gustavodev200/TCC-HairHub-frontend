import { ClientComponentLoader } from "@/components/ClientComponentLoader/ClientComponentLoader";
import { ClientSideAppProvider } from "@/components/ClientSideAppProvider/ClientSideAppProvider";
import "@/styles/GlobalStyle.css";

import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";

const poppinsFont = localFont({
  src: "../../public/fonts/Poppins-Regular.ttf",
  display: "swap",
});

// const poppinsFont = Poppins({
//   weight: "500",
//   subsets: ["latin"],
//   variable: "--poppinsFont",
// });

export const metadata = {
  title: {
    default: "Hair Hub | Barbearia",
    template: "Hair Hub | %s",
  },
  description:
    "App para barbearia desenvolvido como trabalho de conclusão de curso de sistemas de informação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={poppinsFont.className}>
      <body>
        <>
          <ClientComponentLoader />
          <ClientSideAppProvider>{children}</ClientSideAppProvider>
        </>
      </body>
    </html>
  );
}
