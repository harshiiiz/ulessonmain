import {
    Box,
    Container,
    Text,
    Image,
    Flex,
    Link,
    HStack,
  } from '@chakra-ui/react'
  import React from 'react'
  
  export const Footer = () => {
    return (
      <Box w="full" bg="brand.grey" pt="6rem" pb="10rem">
        <Container maxW="1440px" p={{base:'', lg:'59px 79px'}}>
          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            justify="space-between"
            align="center"
          >
            <Image
              loading="lazy"
              w="148px"
              alt="logo"
              src="/ulessonicon.svg"
            />
            <Flex
              flexDir={{ base: 'column', lg: 'row' }}
              align="center"
              mt={{ base: '2px', lg: '0' }}
            >
              {links.map((link) => (
                <Link
                  display="inline-block"
                  mx="24px"
                  my={{ base: '1rem', lg: '0' }}
                  fontSize={{ base: '20px', lg: '16px' }}
                  key={link.title}
                  href={link.path}
                >
                  {link.title}
                </Link>
              ))}
            </Flex>
            <HStack spacing="30px" mt={{ base: '20px', lg: '0' }}>
              {socialLinks.map((link) => (
                <Link key={link.title} href={link.path} target="blank">
                  <Image
                    loading="lazy"
                    src={`/${link.title}.svg`}
                    w="20px"
                    maxH="20px"
                    alt={link.title}
                  />
                </Link>
              ))}
            </HStack>
          </Flex>
          <Box mt="7rem" maxW="104rem" mx="auto">
            <Text opacity="0.3" fontSize="18px">
              uLesson leverages best in-class teachers, media, and technology to
              create high-quality, affordable and accessible education for
              students. The uLesson app offers students in Primary, Junior and
              Senior Secondary School a holistic learning experience as well as
              those preparing for WASSCE, JAMB, NECO and GCE exams.
              <br /> <br />
              Our app features over 10,000 interactive quizzes with detailed
              solutions; making it an excellent tool for preparing for and
              cracking exams. Students in SSS/SHS can take advantage of this
              quality resource put together by subject matter experts to pass
              their exams. It also helps students learn time management, exam
              formats, and accuracy skills.
            </Text>
          </Box>
        </Container>
      </Box>
    )
  }
  
  const links = [
    {
      title: 'Blog',
      path: '/',
    },
    {
      title: 'Privacy Policy',
      path: '/',
    },
    {
      title: 'Terms of Services',
      path: '/',
    },
    {
      title: 'Help/FAQ',
      path: '/',
    },
  ]
  
  const socialLinks = [
    {
      title: 'twitter',
      path: '/',
    },
    {
      title: 'fb',
      path: '/',
    },
    {
      title: 'yt',
      path: '/',
    },
    {
      title: 'ig',
      path: '/',
    },
  ]
  