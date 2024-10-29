import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { UserData } from "@/components/Header";
import {
  Box,
  Center,
  Flex,
  Group,
  Loader,
  Paper,
  RingProgress,
  Text,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { User } from "@prisma/client";
import {
  IconCheck,
  IconCircleCheck,
  IconFlame,
  IconMoodHappy,
  IconMoodSad,
} from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { Flame, CircleCheck, Check, CircleX } from "lucide-react";

export default function Streak() {
  const session = useSession();

  const [date, setDate] = useState(new Date());

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

  const {
    data: allUsers,
    isLoading: allUsersIsLoading,
    isError: allUsersIsError,
  } = useQuery<User[]>({
    queryKey: ["challenge"],
    queryFn: async () => {
      const res = await axios.get("/api/user/getAllUsersPoints");
      return res.data;
    },
  });

  if (
    !userInfo ||
    isLoading ||
    isError ||
    !allUsers ||
    allUsersIsLoading ||
    allUsersIsError
  ) {
    return (
      <Center style={{ height: 500 }}>
        <Loader />
      </Center>
    );
  }

  // Pre-processing to render the calendar
  const lastActive = new Date(userInfo.lastActive ?? "");
  const startDateTime = new Date(userInfo.lastActive ?? "");
  startDateTime.setDate(lastActive.getDate() - userInfo.loginStreak + 1); // Start of login streak
  startDateTime.setHours(0, 0, 0, 0); // Set to midnight for comparison in the calendar
  lastActive.setHours(0, 0, 0, 0); // Set to midnight for comparison in the calendar

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold">Daily Streak</h1>
      <div className="my-4 h-px bg-gray-200" />

      <div className="m-3 rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Streak Section */}
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 flex items-center justify-center">

                <Flex align="center" justify="center" ta="center" gap="md">
                  <RingProgress
                    size={80}
                    thickness={5}
                    sections={[
                      {
                        value:
                          (userInfo.loginStreak /
                            new Date(
                              lastActive.getFullYear(),
                              lastActive.getMonth() + 1,
                              0
                            ).getDate()) *
                          100,
                        color: "yellow",
                      },
                    ]}
                    label={
                      <Center>
                        <IconFlame
                          size={24}
                          stroke={1.5}
                          className="fill-amber-300 stroke-orange-500"
                        />
                      </Center>
                    }
                  />

                </Flex>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="h-6 w-6 fill-amber-300 stroke-orange-500" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase text-gray-500">Login Streak</p>
              <p className="text-lg font-bold">{userInfo.loginStreak}</p>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="text-center">
            <p className="text-sm font-bold uppercase text-gray-500">Leaderboard</p>
            <p className="text-xs font-bold uppercase text-gray-500">
              (Resets in{" "}
              {new Date(
                lastActive.getFullYear(),
                lastActive.getMonth() + 1,
                0
              ).getDate() - lastActive.getDate()}{" "}
              days)            </p>
            <div className="flex items-center justify-center">
              <span className="mr-2 text-lg font-bold">#
                {allUsers
                  ?.map((user: User) => {
                    return user?.id;
                  })
                  .indexOf(session?.data?.user?.id ?? "") + 1}</span>
              <span className="text-sm text-gray-500">({userInfo.points} 🪙)</span>
            </div>
          </div>

          {/* Attempted Today Section */}
          <div className="text-center">
            <p className="text-sm font-bold uppercase text-gray-500">Attempted Today</p>
            <div className="flex justify-center">
              {(userInfo.attempts[lastActive.toDateString()] ?? 0) > 0 ? (
                <CircleCheck className="h-6 w-6 text-green-500 mt-4" />
              ) : (
                <CircleX className="h-6 w-6 text-red-500 mt-4" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="flex flex-col items-center justify-center">
        <Calendar
          value={date}
          onChange={(value) => setDate(value ?? new Date())}
          size="xl"
          color=""
          renderDay={(date) => {
            const day = date.getDate();

            return date >= startDateTime && date <= lastActive ? (
              date.toDateString() in userInfo.attempts ? (
                <Flex>
                  <IconCircleCheck size={22} stroke={3} color="lime" />
                  {day}
                </Flex>
              ) : (
                <Flex>
                  <IconCheck size={12} stroke={4} color="orange" />
                  {day}
                </Flex>
              )
            ) : (
              <>{day}</>
            );
          }}
        />
      </div>
    </div>
  );
}
