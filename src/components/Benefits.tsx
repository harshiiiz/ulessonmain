import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

export const Benefits = () => {
  return (
    <Box bg={"brand.greybg"}>
      <Container maxW={"1440px"}>
        <Flex
          flexDir={"column"}
          pt={{ base: "6.4rem", lg: "74px" }}
          pb={{ base: "55px", lg: "112px" }}
          alignItems="center"
        >
          <Heading
            fontFamily={"font.heading"}
            fontSize={{ base: "32px", lg: "48px" }}
            color='brand.purple'
            
          >
            Benefits & Awards
          </Heading>
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            columnGap={{ base: "0", lg: "2.4rem" }}
            rowGap={{ base: "6rem", lg: "0" }}
            mt={{ base: "76px", lg: "11.9rem" }}
          >
            <Prize
              text="1st Place"
              amt="₦ 1,000,000"
              icon="/2.svg"
              color=" #68BC98"
            />
            <Prize
              text="2nd Place"
              amt="₦ 250,000"
              icon="/3.svg"
              color="#7B7FDA"
            />
            <Prize
              text="3rd Place"
              amt="₦ 150,000"
              icon="/4.svg"
              color="#F9AD6D"
            />
            <Prize
              text="4th - 10th Place"
              amt="Other Prizes"
              icon="/1.svg"
              color="#301446;"
            />
          </Flex>
          <Flex flexDir={"row"} alignItems={"center"}>
            <Image
              loading="lazy"
              w="42px"
              h="42px"
              alt="icon"
              src={"/award.svg"}
              mt='10px'
            />
            <Text
              fontSize={{ base: "16px", lg: "18px" }}
              marginInlineStart={"0.5rem"}
              mt={{ base: "44px", lg: "10px" }}
              fontFamily={"font.heading"}
              color='brand.purple'
              opacity='0.7'
            >
              These awards apply to each of the four categories. The top 3
              winning schools in each category will receive awards
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

const Prize = ({
  text,
  amt,
  icon,
  color,
}: {
  text: string;
  amt: string;
  icon: string;
  color: string;
}) => {
  return (
    <Flex
      flexDir={"column"}
      justifyContent={"space-between"}
      padding=" 23px 22px 24px 26px"
      bg={"brand.white"}
      w={{ base: "17.6rem", lg: "17.6rem" }}
      h={{ base: "7.3rem", lg: "8.6rem" }}
      position={"relative"}
    >
      <Box position={"absolute"} top="-45px" right="22px">
        <Image
          src={icon}
          w={{ lg: "5.5rem", base: "5.1rem" }}
          h={{ lg: "5.5rem", base: "5.1rem" }}
        ></Image>
      </Box>
      <Text
        color={color}
        fontSize="20px"
        fontWeight="600"
        fontFamily={"font.heading"}
        lineHeight="110%"
        letterSpacing={"-0.06em"}

      >
        {text}
      </Text>
      <Text
        fontSize={{ base: "27.4px", lg: "32px" }}
        fontWeight="600"
        fontFamily={"font.heading"}
        lineHeight="110%"
        letterSpacing={"-0.06em"}
        color='brand.purple'
      >
        {amt}
      </Text>
    </Flex>
  );
};
