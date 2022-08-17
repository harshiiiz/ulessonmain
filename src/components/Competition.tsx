

import {
  background,
  Box,
  Container,
  Flex,
  Heading,
  Hide,
  HStack,
  Image,
  Show,
  Text,
  VStack
} from '@chakra-ui/react'
import React from 'react'

export const Competition = () => {
  return (
      <Box bg='brand.white'>
          <Container maxW="1440px" pb={{base:'64px', lg:'0px'}}>
              <Flex
                  p={{ base: "15px", lg: "7rem" }}
                  flexDir="column"
                  justify="center"
                  alignItems="center"
              >
                  <Heading
                      fontSize={{ lg: "48px", base: "32px" }}
                      lineHeight={{ base: '3.5rem', lg: '"5.28rem"' }}
                      letterSpacing='-0.06em'
                      fontWeight="600"
                      textAlign="center"
                      fontFamily={'Montserrat'}
                      mt={{base:'64px', lg:'0px'}}
                  >
                      Competition Categories
                  </Heading>

                  <Box w="100%">
                      <Category />
                      <EligibilityAndRules />
                  </Box>
              </Flex>
          </Container>
      </Box>
  )
}

const juniorSubject = [
  'Mathematics',
  'English Language',
  'Basic Science'
]

const seniorScienceSubject = [
  'Mathematics',
  'English Language',
  'Physics',
  'Chemistry',
  'Biology'
]

const seniorBusinessSubject = [
  'Mathematics',
  'English Language',
  'Economics',
  'Accounting',
  'Commerce/Business studies'
]

const seniorHumanitiesSubject = [
  'Mathematics',
  'English Language',
  'Economics',
  'Literature-in-English',
  'Government & Politics'
]

const rules = [
  'Schools are allowed to enter as many of their students as they would like to register.',
  'Schools must register their students with the same name and phone number with which the students are registered (or will register) on the uLesson app.',
  'Schools must register their participants before the registration deadline date.',
  'Schools must ensure that their participants register for the exams on the uLesson app before the deadline date.',
  'The decisions of the organizers - uLesson Education Limited, are final in every aspect of the challenge.'
]

const Category = () => {
  return (
      <Flex
          mt="5.4rem"
          gap="24px"
          flexDir={{ base: "column", lg: 'row' }}
      >
          <JuniorCategory />
          <SeniorCategory />
      </Flex>
  )
}

const List = ({ text }: { text: string }) => {
  return (
      <Text
          color='#301446'
          fontSize={{ base: '16px', lg: '16px' }}
          fontWeight="600"
          m="0 !important"
          opacity="0.7"
          letterSpacing="-0.01em"
          fontStyle="normal"
          fontFamily={'Mulish'}
      >
          {text}
      </Text>
  )
}

const CategoryForMobile = ({
  color,
  subjects,
  heading,
  subHeading
}: {
  color: string
  subjects: (string)[]
  heading: string
  subHeading?: string
}) => {
  return (
      <Box
          w="100%"
          h="100%"
          border="2px solid rgba(48, 20, 70, 0.05)"
          borderRadius="8px"
          borderTopRadius="0"
      >
          <Heading
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius='8px'
              borderBottomRadius="0"
              w="inherit"
              fontSize={{ base: '24px', lg: '24px' }}
              fontWeight="600"
              bg={color}
              h="72px"
              color="brand.white"
          >
              {heading}
          </Heading>
          <VStack
          pb={'20px'}
              pt={heading === 'Senior' ? "0px" : '24px'}
              gap="24px"
          >
              {subHeading && <Flex
                  h="47px"
                  borderBottom="1px solid rgba(48, 20, 70, 0.05)"
                  fontSize={{ base: '18px', lg: '18px' }}
                  fontWeight="700"
                  letterSpacing="-0.01em"
                  alignItems="center"
                  justify="center"
                  bg="#F2F2FB"
                  w="100%"
                  color={'brand.purple'}
                  fontFamily='Mulish'
                  
              >
                  <Text>{subHeading}</Text>
              </Flex>}
              {subjects.map((subject, index) => {
                  return <List   text={subject} key={index} />
              })}
          </VStack>
      </Box>
  )
}

const SeniorCategory = () => {
  return (
      <Box
          w={{ base: '100%', lg: 'full' }}
          border={{ lg: "2px solid rgba(48, 20, 70, 0.05)" }}
          borderRadius="8px"
          borderTopRadius="0"
      >
          <Hide below='md'>
              <Heading
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius='8px'
                  borderBottomRadius="0"
                  w="inherit"
                  fontSize={{ base: '', lg: '24px' }}
                  fontWeight="600"
                  bg="brand.green"
                  h="72px"
                  color="brand.white"
                  fontFamily='Montserrat'
              >
                  Senior
              </Heading>
              <Flex
                  justify="space-evenly"
                  flexDir={{ base: "column", lg: 'row' }}
              >
                  <Box
                      w="33.3%"
                  >
                      <Flex
                          h="47px"
                          borderBottom="1px solid rgba(48, 20, 70, 0.05)"
                          fontSize={{ base: '', lg: '18px' }}
                          fontWeight="fontWeights.semibold"
                          letterSpacing="-0.01em"
                          alignItems="center"
                          justify="center"
                          bg={"#F2F2FB"}
                          fontFamily='Mulish'
                      >
                          <Text
        >Science</Text>
                      </Flex>
                      <VStack
                          gap="20px"
                          pt="9px"
                          pb='11px'
                      >
                          {seniorScienceSubject.map((subject, index) => {
                              return <List text={subject} key={index} />
                          })}
                      </VStack>
                  </Box>
                  <Box
                      w="33.3%"
                  >
                      <Flex
                          h="47px"
                          borderBottom="1px solid rgba(48, 20, 70, 0.05)"
                          borderLeft="1px solid rgba(48, 20, 70, 0.05)"
                          borderRight="1px solid rgba(48, 20, 70, 0.05)"
                          fontSize={{ base: '', lg: '18px' }}
                          fontWeight="fontWeights.semibold"
                          letterSpacing="-0.01em"
                          alignItems="center"
                          justify="center"
                          bg={"#F2F2FB"}
                          fontFamily='Mulish'
                      >
                          <Text>Business</Text>
                      </Flex>
                      <VStack
                          borderLeft="1px solid rgba(48, 20, 70, 0.05)"
                          borderRight="1px solid rgba(48, 20, 70, 0.05)"
                          gap="20px"
                          pt="9px"
                          pb='11px'
                      >
                          {seniorBusinessSubject.map((subject, index) => {
                              return <List text={subject} key={index} />
                          })}
                      </VStack>
                  </Box>
                  <Box
                      w="33.3%"
                  >
                      <Flex
                          h="47px"
                          borderBottom="1px solid rgba(48, 20, 70, 0.05)"
                          fontSize={{ base: '', lg: '18px' }}
                          fontWeight="fontWeights.semibold"
                          letterSpacing="-0.01em"
                          alignItems="center"
                          justify="center"
                          bg={"#F2F2FB"}
                          fontFamily='Mulish'
                      >
                          <Text>Humanities</Text>
                      </Flex>
                      <VStack gap="20px"
                          pt="9px"
                          pb='11px'>
                          {seniorHumanitiesSubject.map((subject, index) => {
                              return <List text={subject} key={index} />
                          })}
                      </VStack>
                  </Box>
              </Flex>
          </Hide>
          <Show below="md">
              <Flex
                  flexDir="column"
                  gap="2.4rem"
              >
                  <CategoryForMobile
                      color="brand.green"
                      subjects={seniorScienceSubject}
                      heading="Senior"
                      subHeading="Science"
                  />
                  <CategoryForMobile
                      color="brand.green"
                      subjects={seniorBusinessSubject}
                      heading="Senior"
                      subHeading="Business"
                  />
                  <CategoryForMobile
                      color="brand.green"
                      subjects={seniorHumanitiesSubject}
                      heading="Senior"
                      subHeading="Humanities"
                  />
              </Flex>
          </Show>

      </Box>
  )
}

const JuniorCategory = () => {
  return (
      <Box
          w={{ base: '100%', lg: "282px" }}
          h={{ base: '246px', lg: "346px" }}
      >
          <CategoryForMobile
              color="#7B7FDA"
              subjects={juniorSubject}
              heading="Junior"
          />
      </Box>
  )
}

const EligibilityAndRules = () => {
  return (
      <Flex
          mt={{base:"61px", lg:'76px'}}
          border="2px solid rgba(48, 20, 70, 0.05)"
          borderRadius="8px"
          flexDir={{ base: 'column', lg: 'row' }}
      >
          <Eligibility />
          <Rules />
      </Flex>
  )
}

const Eligibility = () => {
  return (
      <Box
          bg="#F2F2FB"
          // w="383px"
          w={{ base: '100%', lg: '383px' }}
          maxH="508px"
          px="25px"
          py="33px"
      >
          <Heading
              
              letterSpacing=" -0.06em"
              fontWeight="600"
              fontSize={{ lg: "48px", base: "32px" }}
              fontFamily='Montserrat'
                    
          >
              Eligibility
          </Heading>
          <Box mt="36px">
              <Heading
                  fontSize={{ base: '24px', lg: '24px' }}
                  letterSpacing=" -0.06em"
                  fontWeight="600"
                  fontFamily='Montserrat'
              >
                  Senior
              </Heading>
              <Text
                  mt="7px"
                  fontSize={{ base: '16px', lg: '16px' }}
                  letterSpacing=" -0.01em"
                  fontWeight="600"
                  opacity="0.7"
                  fontFamily='Mulish'
              >
                  Participants for the senior category competition must be under 18 and current students of their schools, either in Year 10/SSS1 or Year 11/SSS2.
              </Text>
          </Box>
          <Box mt="46px">
              <Heading
                  fontSize={{ base: '24px', lg: '24px' }}
                  letterSpacing=" -0.06em"
                  fontWeight="600"
                  fontFamily='Montserrat'
              >
                  Junior
              </Heading>
              <Text
                  mt="0.7rem"
                  fontSize={{ base: '16px', lg: '16px' }}
                  letterSpacing=" -0.01em"
                  fontWeight="600"
                  opacity="0.7"
                  fontFamily='Mulish'
              >
                  Participants for the junior category competition must be under 18 and current students of their schools, either in Year 8/JSS2 or Year 9/JSS3.
              </Text>
          </Box>
      </Box>
  )
}

const Rules = () => {
  return (
      <Box
          w="full"
          pt="42px"
          pl="25px"
      >
          <Heading
              fontSize={{ base: '24px', lg: '32px' }}
              letterSpacing=" -0.06em"
              fontWeight="600"
              fontFamily='Montserrat'
          >
              Rules of Competition
          </Heading>

          <Box
              mt='32px'
              mr={{base:'24px', lg:'0px'}}
             
          >
              {rules.map((rule, index) => {
                  return (
                      <Flex
                          key={index}
                          mb="22px"
                      >
                          <Image loading='lazy' w="24px" alt='icon' src="/bx_checkblack.svg" />
                          <Text
                              fontSize={{ base: '16px', lg: '16px' }}
                              fontWeight="fontWeights.semibold"
                              ml="14px"
                              opacity="0.7"
                              letterSpacing="-0.01em"
                              fontStyle="normal"
                              fontFamily='Mulish'>
                              {rule}
                          </Text>
                      </Flex>
                  )
              })}
          </Box>
      </Box>
  )
}
