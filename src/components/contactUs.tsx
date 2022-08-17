import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";

export const ContactUs = () => {
  return (
    <Box py="60px" bg="brand.purple">
      <Container maxW={1440}>
        <Flex flexDir={{ base: "column", lg: "row" }} ml={{ base:'1rem' ,lg:'7.75rem'}} mr={ {base :'1rem' ,lg:'7.75rem'}}>
          <Box
            w={{ base: "full", lg: "50%" }}
            textAlign={{ base: "center", lg: "left" }}
            
          >
            <Heading fontSize={48} color="brand.white" fontFamily='font.heading'>
              Contact Us
            </Heading>
            <Text fontSize='24px' fontWeight='600' color="brand.white" mt='24px' fontFamily='font.body'>
              For further clarifications or enquiries, please contact us at:
            </Text>
            <Box mt="2rem" mx={{ base: "auto", lg: "0" }}>
            <PhoneNo
              phone="+234 9139 345 357"
              icon="/phone.svg"
              onClick={() => window.open("tel:+2349139345357")}
            />
            <PhoneNo
            key={'id'}
              phone="+234 9139 345 357"
              icon="/watsapp.svg"
              onClick={() => window.open("tel:+2349139345357")}
            />
            <PhoneNo
             key={'id1'}
              phone="challenge@ulesson.com"
              icon="/mail.svg"
              onClick={() => window.open("mailto:challenge@ulesson.com")}
            />
            </Box>
          </Box>
          <Box w={{ base: "full", lg: "50%" }} marginBottom={"4"}>
            <Image
              maxW="50rem"
              w={{base:'0',lg:"482.4px"}}
              mx="auto"
              loading="lazy"
              alt="contactUs"
              src="/contact.svg"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

const PhoneNo = ({
  phone,
  icon,
  onClick,
}: {
  phone: string;
  icon: string;
  onClick: () => void;
}) => {
  return (
    <HStack
      spacing="2rem"
      justify={"flex-start" }
      onClick={onClick}
      cursor="pointer"
      p='10px'

    >
      <Image loading="lazy" w='24px' h='24px' alt="icon" src={icon} />
      <Heading fontSize='24px' fontWeight="700" color="brand.white" ml='0.625rem' textAlign={'left'} fontFamily='font.heading' wordBreak={'break-all'}>
        {phone}
      </Heading>
    </HStack>
  );
};
