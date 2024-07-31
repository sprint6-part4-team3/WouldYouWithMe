import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "할 일 목록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto mt-24 min-w-343 max-w-1200 px-16">
      <header className="mb-27">
        <h1 className="text-20-700 text-text-primary">할 일</h1>
      </header>
      {children}
    </div>
  );
}
