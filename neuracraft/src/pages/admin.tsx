import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState } from "react";

import Accounts from "@/components/admin/Accounts";
import Courses from "@/components/admin/Courses";
import Overview from "@/components/admin/Overview";
import Users from "@/components/admin/Performance";
import Settings from "@/components/admin/Settings";
import QuestionViewer from "@/components/editor/QuestionViewer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RoleBadge } from "@/components/misc/Badges";
import TopNavbar from "@/components/Navbar";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconArrowBarLeft,
  IconBrain,
  IconChartDots,
  IconPresentationAnalytics,
  IconPuzzle,
  IconSettings,
  IconUsers,
} from "@tabler/icons";

const tabs = [
  { label: "Overview", icon: IconChartDots },
  { label: "Questions", icon: IconPuzzle },
  { label: "Accounts", icon: IconUsers },
  { label: "Courses", icon: IconPresentationAnalytics },
  { label: "Performance", icon: IconBrain },
  { label: "Settings", icon: IconSettings },
];

export default function AdminPage() {
  const session = useSession();
  const [activeTab, setActiveTab] = useState("Overview");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useMemo(() => {
    if (isMobile !== undefined) {
      setSidebarOpen(!isMobile);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header title="Admin Dashboard" />
      <TopNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex relative">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed md:relative md:translate-x-0 transform transition-transform duration-200 ease-in-out z-20">
            <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
                  Dashboard
                </h2>
                <RoleBadge role={session?.data?.user?.role} />
              </div>
            </div>

            <nav className="py-4 px-2 space-y-1">
              {tabs.map((item) => {
                const isActive = item.label === activeTab;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveTab(item.label);
                      isMobile && setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${isActive
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                  >
                    <item.icon
                      className={`flex-shrink-0 w-6 h-6 ${isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                        }`}
                    />
                    <span className="ml-3 font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="absolute bottom-0 w-full px-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Link
                href="/courses"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <IconArrowBarLeft className="w-5 h-5 mr-2" />
                Return to Courses
              </Link>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${sidebarOpen ? 'md:ml-64' : ''} transition-spacing duration-200`}>
          <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {activeTab === "Overview" ? (
              <Overview />
            ) : activeTab === "Questions" ? (
              <QuestionViewer />
            ) : activeTab === "Accounts" ? (
              <Accounts />
            ) : activeTab === "Courses" ? (
              <Courses />
            ) : activeTab === "Performance" ? (
              <Users />
            ) : activeTab === "Settings" ? (
              <Settings />
            ) : null}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};