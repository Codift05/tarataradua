import "./operator.css";

export const metadata = { robots: { index: false, follow: false } };

export default function OperatorRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
