import type { Metadata } from "next";
import type { ReactNode } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "SPM — Externaliser vos métiers clés",
  description:
    "Conseillers francophones recrutés, formés et encadrés par SPM : service client, assistance administrative, développement commercial, recrutement & RH.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
