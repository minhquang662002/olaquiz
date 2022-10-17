import { FC } from "react";
import { prisma } from "../../utils/db";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Container, Box, Divider, Typography } from "@mui/material";
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
            <>
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: 2,
                }}
              >
                <div
                  style={{
                    width: 200,
                    height: 150,
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.image}
                    alt="vocab_image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <Typography variant="body1">
                    <span style={{ color: "red" }}>{item.word}</span>{" "}
                    <span style={{ color: "blue" }}>{item.spelling}</span>
                  </Typography>
                  <Typography>{item.definition}</Typography>
                  <Typography>{item.example}</Typography>
                  <audio src={item.audio} controls></audio>
                </div>
              </Box>
              <Divider />
            </>
          );
        })}
      </Container>
    </>
  );
};

export default TopicPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query?.id;
  const topic = ctx.query?.topic as string;

  const vocabularies = await prisma.vocabulary.findMany({
    where: {
      topic: {
        title: {
          contains: topic,
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
