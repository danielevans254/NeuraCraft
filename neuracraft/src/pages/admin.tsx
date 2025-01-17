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
  const [active, setActive] = useState("Overview");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [sidebarOpened, setSidebarOpened] = useState(!isMobile);

  useMemo(() => {
    if (isMobile !== undefined) {
      setSidebarOpened(!isMobile);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header title="Admin Panel" />
      <TopNavbar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />

      <div className="flex">
        {sidebarOpened && (
          <nav className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Admin</h2>
                <RoleBadge role={session?.data?.user?.role} />
              </div>
            </div>

            <div className="py-4">
              {tabs.map((item) => {
                const isActive = item.label === active;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActive(item.label);
                      isMobile && setSidebarOpened(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center space-x-3 rounded-lg transition-all ${isActive
                        ? "bg-blue-500 text-white dark:bg-blue-700 dark:text-blue-100"
                        : "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                      }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${isActive
                          ? "bg-blue-600 dark:bg-blue-800"
                          : "bg-gray-100 dark:bg-gray-700"
                        }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${isActive
                            ? "text-white dark:text-blue-300"
                            : "text-gray-500 dark:text-gray-400"
                          }`}
                      />
                    </div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="absolute bottom-0 w-64 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/courses"
                className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                <IconArrowBarLeft className="w-5 h-5 mr-2" />
                <span>Back to Courses</span>
              </Link>
            </div>
          </nav>
        )}

        <main className="flex-1 p-6">
          {active === "Overview" ? (
            <Overview />
          ) : active === "Questions" ? (
            <QuestionViewer />
          ) : active === "Accounts" ? (
            <Accounts />
          ) : active === "Courses" ? (
            <Courses />
          ) : active === "Performance" ? (
            <Users />
          ) : active === "Settings" ? (
            <Settings />
          ) : null}
        </main>
      </div>

      <Footer />
    </div>
  );
}
