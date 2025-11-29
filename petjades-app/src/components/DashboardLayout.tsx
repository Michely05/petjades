import { DashboardHeader } from "./DashboardHeader"
import { DashboardSidebar } from "./DashboardSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({children}: LayoutProps) => {
    return (
        <div className="flex flex-col h-screen">
          <DashboardHeader />

        <div className="flex flex-1">
          <DashboardSidebar /> 

        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
    );
}