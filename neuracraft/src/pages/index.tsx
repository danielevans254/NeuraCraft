import Image from "next/image";
import { motion } from "framer-motion";
import { IconBrain, IconBook, IconTrophy } from '@tabler/icons';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  const { classes } = useStyles();
  return (
    <Paper shadow="md" radius="md" p="xl" className={classes.featureCard}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {icon}
        <Text weight={700} size="xl" mt="md">{title}</Text>
        <Text color="dimmed" size="sm" mt="sm">{description}</Text>
      </motion.div>
    </Paper>
  );
};

export default function HomePage() {
  const { classes, theme } = useStyles();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <Container>
        <Navbar withBorder={false} {...{ className: "bg-transparent" }} />
      </Container>
      <Container className={classes.wrapper} size={1400} px="xl">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box className={classes.inner}>
            <Title className={classes.title}>
              AI-Powered{" "}
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: theme.colors.cyan[5], to: "blue" }}
                inherit
              >
                Mastery Estimation
              </Text>
            </Title>
            <Container p={0} size={650}>
              <Text
                size="lg"
                color="dimmed"
                className={classes.description}
                my="lg"
              >
                Transform your learning experience with a dynamic platform that elevates traditional education. Break free from the &quot;one-size-fits-all&quot;model and engage with personalized challenges aimed to match your skill level.
              </Text>
            </Container>
            <Box className={classes.controls} mt="xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className={classes.control}
                  size="lg"
                  component="a"
                  href="/courses"
                  variant="gradient"
                  gradient={{ from: 'cyan', to: 'blue' }}
                >
                  Start Your Journey
                </Button>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Container>

      <Container size={1200} mt={75
      }>
        <h1 className="w-full items-center justify-center flex flex-col text-5xl mb-8">
          Features

        </h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Grid>
            <Grid.Col xs={12} sm={4}>
              <FeatureCard
                icon={<IconBrain size={48} stroke={1.5} color={theme.colors.blue[6]} className="" />}
                title="Adaptive Learning"
                description="Our AI-powered system adjusts to your learning pace and style, ensuring an optimized learning experience."
              />
            </Grid.Col>
            <Grid.Col xs={12} sm={4}>
              <FeatureCard
                icon={<IconBook size={48} stroke={1.5} color={theme.colors.cyan[6]} />}
                title="Comprehensive Curriculum"
                description="Access a wide range of engineering topics, from basics to advanced concepts, all in one place."
              />
            </Grid.Col>
            <Grid.Col xs={12} sm={4}>
              <FeatureCard
                icon={<IconTrophy size={48} stroke={1.5} color={theme.colors.yellow[6]} />}
                title="Progress Tracking"
                description="Monitor your growth with detailed analytics and earn points as you master new skills."
              />
            </Grid.Col>
          </Grid>
        </motion.div>
      </Container>

      <Container size={1000} p="lg" mt={100} mb={100}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Paper shadow="md" radius="lg" p="xl" className={classes.featurePaper}>
            <Grid grow>
              <Grid.Col sm={4} pb="lg" className={classes.image}>
                <Image
                  src="/bkt-diagram.png"
                  alt="Bayesian Knowledge Tracing Diagram"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-auto w-full"
                />
              </Grid.Col>
              <Grid.Col sm={8}>
                <Stack justify="flex-start" spacing="md">
                  <Container>
                    <Title order={2} className={classes.featureTitle}>The Recommendation Engine</Title>
                    <Text
                      size="md"
                      align="justify"
                      color="dimmed"
                      className={classes.featureText}
                    >

                      NeuraCraft leverages the Machine Learning algorithm known as{" "}
                      <em>Bayesian Knowledge Tracing (BKT)</em> to provide a
                      personalized learning experience.
                    </Text>
                  </Container>
                  <Text
                    size="md"
                    align="justify"
                    color="dimmed"
                    className={classes.featureText}
                  >
                    BKT is a probabilistic model that estimates a student&apos;s
                    mastery of a concept based on their performance on a series of
                    questions. Our model is trained on simulated student
                    interactions based on historical quiz distribution statistics
                    for selected topics.
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        </motion.div>
      </Container>

      <Footer />
    </motion.div>
  );
}

const useStyles = createStyles((theme) => ({
  image: {
    filter: theme.colorScheme === "dark" ? "invert(1)" : "none",
  },

  wrapper: {
    position: "relative",
    paddingTop: 120,
    paddingBottom: 80,
    zIndex: 1,

    "@media (max-width: 755px)": {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: "relative",
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 56,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 32,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",
    lineHeight: 2.0,

    "@media (max-width: 520px)": {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,
    display: "flex",
    justifyContent: "center",

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    zIndex: 1,
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    "@media (max-width: 520px)": {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },

  featurePaper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
  },

  featureTitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 28,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
  },

  featureText: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    lineHeight: 1.6,
  },

  featureCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
    ),
  },

  testimonial: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
  },
}));