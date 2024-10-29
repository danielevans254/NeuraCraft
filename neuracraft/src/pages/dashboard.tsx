import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useMemo, useState } from "react";

import Footer from "@/components/Footer";
import Header, { UserData } from "@/components/Header";
import TopNavBar from "@/components/Navbar";
import Account from "@/components/user/Account";
import Leaderboard from "@/components/user/Leaderboard";
import Statistics from "@/components/user/statistics/Statistics";
import Streak from "@/components/user/Streak";
import {
  AppShell,
  Avatar,
  Box,
  Center,
  Container,
  createStyles,
  Loader,
  Navbar,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useMediaQuery, useSessionStorage } from "@mantine/hooks";
import {
  IconLogout,
  IconReportAnalytics,
  IconSettings,
  IconTargetArrow,
  IconTrophy,
} from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const tabs = [
  { label: "Daily Streak", icon: IconTargetArrow },
  { label: "Leaderboard", icon: IconTrophy },
  { label: "Statistics", icon: IconReportAnalytics },
  { label: "Account", icon: IconSettings },
];

export default function DashboardPage() {
  const session = useSession();

  const { classes, theme, cx } = useStyles();
  const [active, setActive] = useSessionStorage({
    key: "dashboardActiveTab",
    defaultValue: "Daily Streak",
  });
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  useMemo(() => {
    if (mobile !== undefined) {
      setSidebarOpened(!mobile);
    }
  }, [mobile]);

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery<UserData>({
    queryKey: ["userInfo", session?.data?.user?.id],
    queryFn: async () => {
      const res = await axios.post("/api/user", {
        id: session?.data?.user?.id,
      });
      return res?.data;
    },
    enabled: !!session?.data?.user?.id,
  });

  const links = tabs.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        mobile && setSidebarOpened(false);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  if (!userInfo || isLoading || isError) {
    return (
      <Center style={{ height: 500 }}>
        <Loader />
      </Center>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {sidebarOpened && (
        <div className="bg-indigo-600 text-white w-64 p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-center mb-6">
              <Center>
                <Avatar
                  size={100}
                  src={userInfo?.image}
                  radius={100}
                  className="mb-3"
                />
              </Center>
              <span className="text-lg font-semibold">{userInfo?.username}</span>
            </div>
            <nav>{links}</nav>
          </div>
          <a
            className="flex items-center p-2 rounded-md font-medium cursor-pointer hover:bg-red-500"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <IconLogout className="mr-2 text-white" stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      )}
      <div className="flex-grow flex flex-col">
        <Header title="My Dashboard" />
        <TopNavBar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} />
        <div className="flex-grow p-6 overflow-auto">
          {active === "Daily Streak" ? (
            <Streak />
          ) : active === "Leaderboard" ? (
            <Leaderboard />
          ) : active === "Statistics" ? (
            <Statistics />
          ) : active === "Account" ? (
            <Account userInfo={userInfo} />
          ) : (
            <p className="text-center text-red-500">Error</p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
          }).background,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
          }).background,
    },

    link: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: "0.875rem", // Tailwind's text-sm
      color: "rgba(255, 255, 255, 0.9)",
      padding: "0.5rem 1rem",
      borderRadius: "0.375rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover effects

      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)", // Light transparent background on hover
        color: "white", // Full white on hover for contrast
      },
    },


    linkIcon: {
      ref: icon,
      color: "white",
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.variant({
              variant: "light",
              color: theme.primaryColor,
            }).background
            : theme.fn.lighten(
              theme.fn.variant({
                variant: "filled",
                color: theme.primaryColor,
              }).background ?? theme.primaryColor,
              0.15
            ),
        color: "white",
        [`& .${icon}`]: {
          color: "white",
          opacity: 0.9,
        },
      },
    },
  };
});
