import axios from "axios";
import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { motion } from 'framer-motion';
import { Mail, LogIn, Loader2 } from 'lucide-react';
import {
  ActionIcon, Button, Container, Group, LoadingOverlay, Stack, Text, TextInput,
  Title, useMantineTheme,
} from "@mantine/core";
import { IconBrandGoogle, IconLogin, IconSpeakerphone } from "@tabler/icons";
import { useMutation } from "@tanstack/react-query";

interface LoginProps {
  setLoginMenuOpened: Dispatch<SetStateAction<boolean>>;
}

export default function Login({ setLoginMenuOpened }: LoginProps) {
  const [email, setEmail] = useState("");
  const [emailLoginIsLoading, setEmailLoginIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    setIsEmailValid(value.length === 0 || /^(.+)@(.+)$/.test(value));
  };

  const emailSignIn = async () => {
    const res = await signIn("credentials", {
      email,
      redirect: false,
    });

    if (res?.error) {
      toast.error(`${res.error}\n\nPlease contact support if this persists.`);
    } else if (res?.ok) {
      toast.success("Login successful!");
      setLoginMenuOpened(false);
      window.location.href = "/dashboard";
    }
    setEmailLoginIsLoading(false);
  };

  const { mutate: handleEmailLogin } = useMutation({
    mutationFn: () =>
      axios.post<{
        customToast: boolean;
        emailAllowed: boolean;
        isNewUser: boolean | undefined;
      }>(`/api/auth/isEmailAllowed?email=${email}`),
    onSuccess: (data) => {
      if (!data?.data.emailAllowed) {
        toast.error(
          "You are not authorized to access NeuraCraft without a valid invite. Please join the waitlist or contact support."
        );
        setEmailLoginIsLoading(false);
      } else {
        emailSignIn();
      }
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again later.");
      setEmailLoginIsLoading(false);
      console.error("Email login error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoginIsLoading(true);
    handleEmailLogin();
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={false}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  NeuraCraft
                </span>
              </h2>
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <div className="relative">
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="relative"
                >
                  <input
                    type="email"
                    required
                    disabled={emailLoginIsLoading}
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-3 rounded-lg border ${isEmailValid
                      ? 'border-gray-200 dark:border-gray-700'
                      : 'border-red-500'
                      } bg-gray-50 dark:bg-gray-900 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all`}
                    placeholder="Enter your invite email"
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </motion.div>
                {!isEmailValid && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    Please enter a valid email address
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-between items-center"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={emailLoginIsLoading}
                className="flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all disabled:opacity-50 w-full"
              >
                {emailLoginIsLoading && (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                )}
                <p className="flex flex-col items-center justify-center mx-auto">
                  Sign In
                </p>
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
