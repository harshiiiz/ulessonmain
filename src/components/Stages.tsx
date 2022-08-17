import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

export const Stages = () => {
  return (
    <Box bg="brand.greybg">
      <Container maxW={"1440px"}>
        <Flex
          flexDir={"column"}
          p={{ base: "64px 16px 64px 16px", lg: "11.1rem 11.1rem 11.1rem 11.1rem" }}
          
          alignItems="center"
        >
          <Heading
            fontFamily={"font.heading"}
            fontSize={{ base: "32px", lg: "48px" }}
            color='brand.purple'
          >
            Challenge Stages
          </Heading>
          <Flex flexDir={"column"} mt={{ base: "31px", lg: "61px" }}>
            <Stage
              title="Stage 1"
              p1="VIRTUAL contest to be taken on the uLesson app - available on Android, iOS (phones and tablets) and web (laptops, desktop computers)."
              p2="Stage One is open to all registered candidates."
              calendar="/calendar.svg"
              date="Saturday, July 2nd, 2022; 10:00am."
              color="#EA7052"
            />
            <Flex
              justifyContent={"space-between"}
              h={{ base: "48px", lg: "56px" }}
              paddingInlineEnd="3.2rem"
              paddingInlineStart="3.2rem"
            >
              <Image src="/Line.svg" loading="lazy"></Image>
              <Image src="/Line.svg"></Image>
            </Flex>
            <Stage
              title="Stage 2"
              p1="PHYSICAL contest to be held at locations in Lagos, Abuja, and Port Harcourt. Schools or parents will be responsible for bringing invited candidates to these locations."
              p2="Top 30 candidates in each of the four categories (Junior, Senior Business, Senior Science, Senior Humanities) will be invited to proceed to Stage Two. 
"
              calendar="/calendar2.svg"
              date="Saturday, July 16th, 2022"
              color="#F9AD6D"
            />
            <Flex
              justifyContent={"space-between"}
              h={{ base: "48px", lg: "56px" }}
              paddingInlineEnd="3.2rem"
              paddingInlineStart="3.2rem"
            >
              <Image src="/Line.svg" loading="lazy"></Image>
              <Image src="/Line.svg"></Image>
            </Flex>

            <Stage
              title="Final Stage"
              p1="PHYSICAL quiz show to be held in Lagos or Abuja. Arrangements will be made by the uLesson team to cover transport and welfare costs for successful candidates who do not reside in the host city."
              p2="Top 10 candidates in each of the four categories (Junior, Senior - Business, Senior - Science, Senior - Humanities) will be invited to proceed to the final stage.
"
              calendar="/calendar3.svg"
              date="Saturday, July 30th, 2022."
              color="#68BC98"
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

const Stage = ({
  title,
  p1,
  p2,
  calendar,
  date,
  color,
}: {
  title: string;
  p1: string;
  p2: string;
  calendar: string;
  date: string;
  color: string;
}) => {
  return (
    <Box p={{base:'30px 24px ', lg:"35px 32px 58px 32px"}} bg="brand.white" borderRadius="8px">
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="space-between"
      >
        <Text fontSize={{base:'24px',lg:"32px"}} fontWeight="600" color={color} fontFamily='Montserrat'>
          {title}
        </Text>
        <Flex columnGap={'8px'}>
          <Image src={calendar} w="20px" h="22px"></Image>
          <Text fontSize={{base:'16px',lg:"18px"}} fontWeight="600" color={"#301446"} fontFamily='Mulish'>
            {date}
          </Text>
        </Flex>
      </Flex>
      <Flex mt="40px" columnGap={"16px"}>
        <Image src="/orangepoint.svg"></Image>
        <Text fontSize={"18px"} fontWeight="600" color={"#301446"} opacity='0.7' fontFamily='Mulish'>
          {p1}
        </Text>
      </Flex>
      <Flex columnGap={"16px"} mt="24px">
        <Image src="/orangepoint.svg"></Image>
        <Text fontSize={"18px"} fontWeight="600" color={"#301446"} opacity='0.7' fontFamily='Mulish'>
          {p2}
        </Text>
      </Flex>
    </Box>
  );
};
