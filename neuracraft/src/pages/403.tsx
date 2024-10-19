import Header from "@/components/Header";
import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from "@mantine/core";

export default function ForbiddenPage() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Header title="403 Forbidden" />
      <div className={classes.label}>403</div>
      <Title className={classes.title}>Oops! You've wandered into a restricted area.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        It looks like you don't have permission to view this page. If you think this is a mistake, feel free to contact the administrator or try signing in with another account.
      </Text>
      <Group position="center" mt="md">
        <Button size="md" component="a" href="/" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
          Go back to the homepage
        </Button>
      </Group>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
  },

  label: {
    fontSize: 220,
    fontWeight: 900,
    lineHeight: 1,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.gray[5]
        : theme.colors.gray[3],
    marginBottom: theme.spacing.xl,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 150,
    },
  },

  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 42,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 34,
    },
  },

  description: {
    maxWidth: 600,
    margin: `${theme.spacing.lg}px auto`,
    fontSize: theme.fontSizes.md,
    lineHeight: 1.6,
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.colors.gray[7],
  },
}));
