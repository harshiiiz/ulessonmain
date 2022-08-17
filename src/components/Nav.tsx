import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  useBoolean,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const links = [
  {
    title: "Schools Challenge",
    path: "/",
  },
  {
    title: "Learning Bundle",
    path: "/",
  },
  {
    title: "Coding School",
    path: "/",
  },
];

export  const Nav=()=> {
  const [isLargerThan768px] = useMediaQuery("(min-width: 768px)");

  const [showMobileMenu, toggleMobileMenu] = useBoolean(false);

  return (
    <Box bg="brand.purple" >
       <Container
      border={'0px'} boxShadow='none'
        maxW="1440px"
        pt={{ base: "0px", lg: "32px" }}
        mr={{ base: "270px", lg: "300px" }}
        pb={{ base: "75px", lg: "22px" }}
       
      > 
        <Flex justify="space-between" align="center" color="#fff" w="full" border={'0px'}>
          <Link href="/">
            
              <Image
                loading="lazy"
                src="/ulessonlogowhite.svg"
                alt="logo"
                w={{ base: "123px", lg: "179px" }}
                cursor="pointer"

              />
            
          </Link>
          {isLargerThan768px ? (
            <HStack spacing={{ base: "57px" }}>
              {links.map((link) => (
                <Link
                  key={link.title}
                  href={link.path}
                  color="#ffffff"
                  fontWeight="700"
                  fontSize="13px"
                  target="blank"
                  fontFamily="Mulish"
                  opacity="0.5"
                  ml='120px'
                  _hover={{ color: "#FFF", textDecoration: "none" }}
                >
                  {link.title}
                </Link>
              ))}
              <Button bg="#EA7052" w='180px' h='50px' as="a" href="/" borderRadius='10px'  fontFamily="Mulish"> 
                TRY IT NOW
              </Button>
            </HStack>
          ) : (
            <Image
              loading="lazy"
              alt="ham"
              src="/menu.svg"
              cursor="pointer"
              onClick={toggleMobileMenu.on}
            />
          )}

          {showMobileMenu && <MobileMenu close={toggleMobileMenu.off} />}
        </Flex>
     </Container> 
    </Box>
  );
}

const MobileMenu = ({ close }: { close: () => void }) => {
  return (
    <Box
      w="100%"
      h="100vh"
      bg="brand.purple"
      pos="fixed"
      top="0"
      left="0"
      zIndex="100"
      overflowY="scroll"
      pb="4rem"
    >
      <Flex justify="space-between" px="2rem" py="2rem">
        <Image
          src="/ulessonlogowhite.svg"
          alt="uLesson logo"
          w={{ base: "123px", lg: "179px" }}
          cursor="pointer"
          onClick={close}
        />
        <Image src="/menu.svg" alt="Close" cursor="pointer" onClick={close} />
      </Flex>
      <VStack mt="4rem" mb="7rem" spacing="5rem">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.path}
            color="#ffffff"
            fontWeight="700"
            fontSize="13px"
            target="blank"
            fontFamily="Mulish"
            opacity="0.5"
            _hover={{ color: "#FFF", textDecoration: "none" }}
          >
            {link.title}
          </Link>
        ))}
      </VStack>
      <Flex justify="center">
        <Button bg="#EA7052" w='180px' h='50px' as="a" href="/"  fontFamily="Mulish">
          TRY IT NOW
        </Button>
      </Flex>
    </Box>
  );
};
