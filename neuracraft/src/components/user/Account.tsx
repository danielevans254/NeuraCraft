import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { z } from "zod";

import {
  Avatar,
  Button,
  Center,
  createStyles,
  FileInput,
  Group,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AccountProps {
  userInfo: User;
}

export default function Account({ userInfo }: AccountProps) {
  const session = useSession();
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  const form = useForm({
    initialValues: {
      userName: userInfo.username,
      userCeuId: userInfo.ceuId ?? "",
      file: null,
    },
    validateInputOnBlur: true,
    validate: zodResolver(
      z.object({
        userName: z
          .string()
          .trim()
          .regex(/^([\w.@]+)$/, "No special characters allowed")
          .min(5, "Minimum 5 characters")
          .max(30, "Maximum 30 characters")
          .or(z.literal(null))
          .or(z.literal("")),
        userCeuId: z
          .string()
          .trim()
          .regex(/^19[0-9]{2}|20[0-9]{2}-[0-9]{5}$/, "Invalid CEU ID")
          .or(z.literal(null))
          .or(z.literal("")),
        file: z
          .instanceof(File)
          .refine((file) => file.size <= 5_000_000, `Max file size is 5MB`)
          .refine(
            (file) => allowedTypes.includes(file.type),
            "Only .png, .jpg, .jpeg, and .webp files are accepted."
          )
          .or(z.literal(null)),
      })
    ),
  });

  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation(
    async () => {
      let imageResponse;
      if (form.values.file) {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const res = await axios.post("/api/signature", {
          id: session?.data?.user?.id,
          timestamp: timestamp,
        });

        const [signature, key] = [res.data.signature, res.data.key];

        const formData = new FormData();
        formData.append("file", form.values.file);
        formData.append("api_key", key);
        formData.append("eager", "b_rgb:9B9B9B,c_pad,h_150,w_150");
        formData.append("folder", "NeuraCraft/profile_media");
        formData.append("public_id", session?.data?.user?.id as string);
        formData.append("timestamp", `${timestamp}`);
        formData.append("signature", signature);
        imageResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dy2tqc45y/image/upload/",
          formData
        );
      }

      return await axios.post("/api/user/update", {
        id: session?.data?.user?.id,
        ceuId: form.values.userCeuId.trim() === "" ? null : form.values.userCeuId,
        username: form.values.userName.trim() === "" ? null : form.values.userName,
        image: imageResponse?.data?.eager?.[0]?.secure_url ?? userInfo.image,
      });
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData(["userInfo", session?.data?.user?.id], {
          ...userInfo,
          ceuId: res.data.ceuId,
          username: res.data.username,
          image: res.data.image,
        });
      },
    }
  );

  return (
    <>
      <Title align="center" mb="md" color={isDark ? "white" : "dark"}>
        Account Settings
      </Title>
      <hr className={classes.divider} />
      <form
        onSubmit={form.onSubmit(
          () => {
            updateUser();
          },
          (errors: typeof form.errors) => {
            Object.keys(errors).forEach((key) => {
              toast.error(errors[key] as string);
            });
          }
        )}
      >
        <Center className={classes.avatarContainer}>
          <Avatar
            size={90}
            src={userInfo?.image}
            radius={100}
            className={classes.avatar}
          />
        </Center>
        <FileInput
          placeholder="Browse image"
          label="Change profile picture"
          description="* PNG / JPG / JPEG / WEBP"
          name="image"
          accept={allowedTypes.join(",")}
          className={classes.fileInput}
          {...form.getInputProps("file")}
        />
        <TextInput
          className={classes.textInput}
          label="Username (Visible to everyone)"
          placeholder="Please select a username"
          name="name"
          variant="filled"
          {...form.getInputProps("userName")}
        />
        <TextInput
          className={classes.textInput}
          label="CEU ID"
          placeholder="Please enter your CEU ID if you are an CEU student"
          name="ceuId"
          variant="filled"
          value={form.values.userCeuId}
          onChange={(e) => {
            form.setFieldValue("userCeuId", e.target.value.toUpperCase());
          }}
          error={form.errors.userCeuId}
        />
        <Group position="center" mt="xl">
          <Button type="submit" size="md" loading={updateUserLoading}>
            Confirm
          </Button>
          <Button
            variant="outline"
            type="button"
            size="md"
            onClick={form.reset}
            className={classes.cancel}
          >
            Reset
          </Button>
        </Group>
      </form>
    </>
  );
}

const useStyles = createStyles((theme) => ({
  avatarContainer: {
    marginTop: theme.spacing.md,
  },
  avatar: {
    marginBottom: theme.spacing.md,
  },
  fileInput: {
    marginTop: theme.spacing.md,
  },
  textInput: {
    marginTop: theme.spacing.md,
  },
  divider: {
    border: 0,
    height: 1,
    background: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
    marginBottom: theme.spacing.md,
  },
  cancel: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
    color: theme.colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[6],
    '&:hover': {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
    },
  },
}));