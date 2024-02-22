import DashLayout from "@/components/dashLayout/dashLayout";

export const metadata = {
  title: "CoSpace - Dashboard",
  description: "Your friend for exploring co working spaces",
};

export default function RootLayout({ children }) {
  return <DashLayout role={["Admin"]}>{children}</DashLayout>;
}
