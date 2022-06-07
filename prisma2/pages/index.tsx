import type { NextPage } from "next";
import Head from "next/head";
import { Container, Header } from "semantic-ui-react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link
          rel="icons"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>
      <Container style={{margin: 20}}>
        <Header as="h3">
          This app is powered by NextJS
        </Header>
        <Form onSubmit={async()=>{
          const body: Prisma.UserCreateInput = {
            
          }
        }}></Form>
      </Container>
    </>
  );
};

export default Home;
