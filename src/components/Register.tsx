import { Box, Button, Container, Flex, Image } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export const Register = () => {
  return (
    <Box  bg='brand.white'>
      <Container maxW={"1440px"}>
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          columnGap={{ base: "0", lg: "25px" }}
          rowGap={{ base: "25px", lg: "0" }}
          alignItems={"center"}
          justifyContent="center"
          p={{ base: "64px 0px", lg: "112px 120px" }}
          //mt={{ base: "7.6rem", lg: "11.9rem" }}
        >
          <Regbox
            text={"Register as a Student"}
            btnlink={"/reg-student"}
            icon={"/student.svg"}
          />
          <Regbox
            text={"Register as a School"}
            btnlink={"/reg-school"}
            icon={"/school.svg"}
          />
        </Flex>
      </Container>
    </Box>
  );
};

const Regbox = ({
  text,
  icon,
  btnlink,
}: {
  text: string;
  icon: string;
  btnlink: string;
}) => {
  return (
    <Flex
      flexDir={"row"}
      bg="brand.greybg"
      p="27px 24px"
      justifyContent="space-between"
      w={{ base: "full", lg: "533px" }}
      borderRadius="8px"
    >
      <Flex
        flexDir={"column"}
        alignItems="flex-start"
        justifyContent="center"
        columnGap="54px"
      >
        <Box
          fontSize={{ base: "24px", lg: "32px" }}
          mb={{ base: "16px", lg: "24px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          letterSpacing={'-0.06em'}
          color='brand.purple'
        >
          {text}
        </Box>
        <NextLink href={btnlink} passHref>
          <Button
            as="a"
            h={{ base: "36px", lg: "56px" }}
            w={{ base: "136px", lg: "210px" }}
            bg="#EA7052"
            p={{ base: "11px 15px", lg: "17px 24px" }}
            fontSize={{ base: "12.9px", lg: "20px" }}
            color="brand.white"
            letterSpacing={"0.4px"}
            fontFamily={"Mulish"}
          >
            REGISTER NOW
          </Button>
        </NextLink>
      </Flex>
      <Image
        src={icon}
        w={{ base: "136px", lg: "224px" }}
        h={{ base: "146px", lg: "224px" }}
      ></Image>
    </Flex>
  );
};
