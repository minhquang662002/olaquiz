import { FC, Fragment } from "react";
import { prisma } from "../../utils/db";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Container, Box, Divider } from "@mui/material";
import Image from "next/image";
const TopicPage: FC<any> = ({ vocabularies, topic }) => {
  return (
    <>
      <Head>
        <title>{topic}</title>
      </Head>
      <Container maxWidth="lg">
        {vocabularies.map((item: any) => {
          return (
            <Fragment key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: 2,
                }}
              >
                <Box
                  sx={{
                    width: {
                      md: 200,
                      xs: 100,
                    },
                    height: {
                      md: 150,
                      xs: 75,
                    },
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.image}
                    alt="vocab_image"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="100%"
                  />
                </Box>
                <Box
                  sx={{
                    fontSize: {
                      md: 15,
                      xs: 10,
                    },
                  }}
                >
                  <span style={{ color: "red" }}>{item.word}</span>
                  <span style={{ color: "blue" }}>{item.spelling}</span>

                  <p>{item.definition}</p>
                  <p>{item.example}</p>
                  <audio className="vocab_audio" src={item.audio} controls />
                </Box>
              </Box>
              <Divider />
            </Fragment>
          );
        })}
      </Container>
    </>
  );
};

export default TopicPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const topic = ctx.query?.topic as string;

  const vocabularies = await prisma.vocabulary.findMany({
    where: {
      topic: {
        title: {
          contains: topic.split("-").join(" "),
          mode: "insensitive",
        },
      },
    },
    orderBy: {
      word: "asc",
    },
  });

  return {
    props: {
      vocabularies,
      topic,
    },
  };
};
