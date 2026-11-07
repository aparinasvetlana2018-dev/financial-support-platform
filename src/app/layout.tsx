import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Своя финансовая опора",
  description: "Образовательная платформа проекта «Своя финансовая опора»"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}