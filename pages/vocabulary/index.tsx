import { NextPage } from "next";
import { GetStaticProps } from "next";
import { prisma } from "../../utils/db";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
interface Props {
  topics: { id: string; title: string; image: string }[];
}

const VocabularyPage: NextPage<Props> = ({ topics }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Từ vựng</title>
      </Head>
      <Container maxWidth="lg" sx={{ marginTop: 5 }}>
        <Grid container spacing={4}>
          {topics.map((item) => (
            <Grid item key={item.id} xs={3}>
              <Card sx={{ height: 250 }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200 }}
                  src={item.image as string}
                />

                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push(
                        {
                          pathname: `/vocabulary/${item.title
                            .toLowerCase()
                            .split(" ")
                            .join("-")}`,
                          query: { id: item.id },
                        },
                        `/vocabulary/${item.title
                          .toLowerCase()
                          .split(" ")
                          .join("-")}`
                      )
                    }
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default VocabularyPage;

export const getStaticProps: GetStaticProps = async () => {
  const topics = await prisma.topic.findMany();
  return {
    props: {
      topics,
    },
  };
};
