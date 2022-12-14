import React, { useState, ReactNode, FC } from "react";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Text,
  InputLeftAddon,
  InputGroup,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import Select from "react-select";

import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

enum GenderEnum {
  female = "female",
  male = "male",
}
enum gradeGroups {
  SeniorSecondary = "Senior Secondary",
  JuniorSecondary = "Junior Secondary",
}
enum ExamLocationenum {
  Lagos = "Lagos",
  Nigeria = "Nigeria",
}
const gender = [
  { value: "female", label: "female" },
  { value: "male", label: "male" },
];
const grades = [
  { value: "Senior Secondary", label: "Senior Secondary" },
  { value: "Junior Secondary", label: "Junior Secondary" },
];
const options = [
  { value: "Lagos", label: "Lagos" },
  { value: "Nigeria", label: "Nigeria" },
];
interface FormValues {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  dateOfBirth: Date;
  gradeGroup: gradeGroups;
  competitionCategory: string;
  class: string;
  phoneNumber: string;
  examLocation: ExamLocationenum;
  email: string;
  representativeName: string;
  representativePhone: string;
  schoolLocation: ExamLocationenum;
  name: string;
  //country:string;
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object().shape({
  firstName: yup.string().required("First name is a required field"),
  lastName: yup.string().required("Last name is a required field"),
  phoneNumber: yup
    .string()
    .required("This is a required field")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number should be of 10 digits only")
    .max(10, "Phone number should be of 10 digits only"),
  competitionCategory: yup
    .string()
    .required("Competition Category is a required field"),
  class: yup.string().required("Class is required"),
  name: yup.string().required("School name is required"),

  email: yup.string().email().required("Email is a required field"),
  representativeName: yup.string().required("This is a required field "),
  representativePhone: yup
    .string()
    .required("This is a required field")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number should be of 10 digits only")
    .max(10, "Phone number should be of 10 digits only"),
});

function Regstudent() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  function convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      let reqObj = {
        firstName: data.firstName,
        lastName: data.lastName,
        gradeGroup: data.gradeGroup,
        gender: data.gender,
        dateOfBirth: convert(data.dateOfBirth.toString()),
        competitionCategory: data.competitionCategory,
        examLocation: data.examLocation,
        class: data.class,
        phoneNumber: data.phoneNumber,
        school: {
          contestId: "62bd82a6138c991f5e1f9dba",
          name: data.name,
          schoolLocation: "Lucknow",
          country: "Nigeria",
          examLocation: data.examLocation,
          representativePhone: data.representativePhone,
          representativeEmail: data.email,
          representativeName: data.representativeName,
        },
      };
      console.log(reqObj);

      const response = await axios({
        method: "post",
        url: "http://13.235.19.203:8080/student/",
        data: reqObj,
        headers: { "Content-Type": "application/json" },
      });
      //  console.log(response);
    } catch (error) {
      console.log(error);
    }
    router.replace("/congrats-student");
    //alert(JSON.stringify(data));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  //console.log(errors);

  return (
    <>
      <Container maxW="997px">
        <Flex mt="46px">
          <Image width="133px" src="/logoulesson.svg" alt="logo" />
          <Spacer />
          <CloseButton size="lg" onClick={onOpen} />
        </Flex>
        <Heading
          as="h2"
          size="xl"
          fontSize="32px"
          mt="83px"
          color="#301446"
          fontWeight="600"
          fontFamily={"Montserrat"}
        >
          uLesson Challenge Registration (Student)
        </Heading>
        <Text
          fontSize="16px"
          mt="11px"
          color="#301446"
          fontWeight="700"
          opacity="0.7"
          mb="25px"
          fontFamily={"Mulish"}
        >
          Please read all instructions carefully before registering for the
          uLesson Challenge{" "}
        </Text>
        <Instructions />
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Heading
            as="h1"
            fontSize="24px"
            mt={{ base: "72px", lg: "78px" }}
            color="#301446"
            fontWeight="600"
            fontFamily={"Montserrat"}
          >
            Student Details
          </Heading>
          <SimpleGrid
            columns={[1, null, 3]}
            spacingX="26px"
            mt="32px"
            spacingY="26px"
            // h= {{lg:'84px'}}
          >
            <FormControl id="firstName" isInvalid={!!errors.firstName} h="84px">
              <FormLabel
                htmlFor="name"
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                First Name
              </FormLabel>
              <Input
                bg="#F9FAFF"
                placeholder=""
                type="text"
                {...register("firstName", { required: true })}
              />
              <FormErrorMessage
                mt={"8px"}
                fontSize="12px"
                fontFamily={"Mulish"}
              >
                {errors.firstName?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="lastName" isInvalid={!!errors.lastName} h="84px">
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Last Name
              </FormLabel>
              <Input
                bg="#F9FAFF"
                placeholder=""
                type="text"
                {...register("lastName", { required: true })}
              />
              <FormErrorMessage
                mt={"8px"}
                fontSize="12px"
                fontFamily={"Mulish"}
              >
                {errors.lastName?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.gender} id="gender" h="84px">
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Gender
              </FormLabel>
              <Select
                options={gender}
                instanceId="gender"
                {...register("gender", { required: true })}
                onChange={(e: any) => setValue("gender", e?.value || "")}
                placeholder=" "
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: "4px",
                    outline: "none",
                    boxShadow: "none",
                    background: "#F9FAFF",
                    borderColor: "#E0E7FF",
                    fontSize: "14px",
                    fontFamily: "Mulish",
                    fontWeight: "600",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "rgba(48, 20, 70, 0.7);",
                    fontSize: "14px",
                    fontFamily: "Mulish",
                    fontWeight: "600",
                    background: state.isSelected ? "#F9FAFF" : "#fff",
                    zIndex: "100",
                  }),
                }}
              />
            </FormControl>
          </SimpleGrid>
          <SimpleGrid
            columns={[1, null, 3]}
            spacingX="26px"
            mt={{ base: "26px", lg: "32px" }}
            spacingY="26px"
          >
            <FormControl
              isInvalid={!!errors.dateOfBirth}
              id="dateOfBirth"
              h="84px"
              width={"100%"}
            >
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Date of birth
              </FormLabel>
              <InputGroup
                borderRadius="4px"
                bg="#F9FAFF"
                h="40px"
                border="1px solid #E0E7FF"
              >
                <InputLeftAddon
                  pointerEvents="none"
                  fontSize="1.2em"
                  p="10px 12px"
                  bg="inherit"
                  h="38px"
                  border={"0px"}
                >
                  <Image src="/calender.svg" alt="calender" w={"16px"} />
                </InputLeftAddon>
                {/* <FormLabel
                  fontStyle={"Mulish !important"}
                  fontWeight="600"
                  letterSpacing="-0.01em"
                  color={"#301446"}
                  fontSize="14px"
                  opacity="1"
                  width={'100%'}
                  p='2 '
                  mb={0}
                  border='0px'
                  
                  marginInlineEnd='0px !important'
                  
                  //bg="#F9FAFF"
                  // zIndex="99999999999999 !important"
                > */}{" "}
                <Controller
                  name={"dateOfBirth"}
                  control={control}
                  render={({ field }) => (
                    <ReactDatePicker
                      placeholderText="01/12/2002"
                      onChange={(date: Date) => field.onChange(date)}
                      selected={field.value}
                      dateFormat="dd/MM/yyyy"
                      filterDate={(date) =>
                        date.getFullYear() > 1995 && date.getFullYear() < 2015
                      }
                      dropdownMode="select"
                      showYearDropdown
                      className="input"
                      scrollableYearDropdown
                    />
                  )}
                />
                {/* </FormLabel> */}
              </InputGroup>
            </FormControl>
            <FormControl isInvalid={!!errors.gradeGroup} id="grade" h="84px">
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Grade Group
              </FormLabel>
              <Select
                options={grades}
                instanceId="gradeGroup"
                {...register("gradeGroup", {
                  required: "Grade group is required",
                })}
                onChange={(e: any) => setValue("gradeGroup", e?.value || "")}
                placeholder=" "
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: "4px",
                    outline: "none",
                    boxShadow: "none",
                    background: "#F9FAFF",
                    borderColor: "#E0E7FF",
                    fontSize: "14px",
                    fontFamily: "Mulish",
                    fontWeight: "600",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "rgba(48, 20, 70, 0.7);",
                    fontSize: "14px",
                    fontFamily: "Mulish",
                    fontWeight: "600",
                    background: state.isSelected ? "#F9FAFF" : "#fff",
                  }),
                }}
              />

              <FormErrorMessage
                mt={"8px"}
                fontSize="12px"
                fontFamily={"Mulish"}
              >
                {errors.gradeGroup?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.competitionCategory} h="84px">
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Competition Category
              </FormLabel>
              <Input
                bg="#F9FAFF"
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                placeholder="Humanities"
                type="text"
                {...register("competitionCategory", { required: true })}
              />
              <FormErrorMessage
                mt={"8px"}
                fontSize="12px"
                fontFamily={"Mulish"}
              >
                {errors.competitionCategory?.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <SimpleGrid
            columns={[1, null, 3]}
            spacingX="26px"
            mt={{ base: "26px", lg: "32px" }}
            spacingY="26px"
          >
            <FormControl id="class" isInvalid={!!errors.class} h="84px">
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Class
              </FormLabel>
              <Input
                bg="#F9FAFF"
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                placeholder="Grade 7 / JSS1"
                type="text"
                {...register("class", { required: true })}
              />
              <FormErrorMessage
                mt={"8px"}
                fontSize="12px"
                fontFamily={"Mulish"}
              >
                {errors.class?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="phoneNumber"
              isInvalid={!!errors.phoneNumber}
              h="84px"
            >
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                uLesson Registered Phone Number
              </FormLabel>
              <Input
                maxLength={10}
                bg="#F9FAFF"
                type="string"
                {...register("phoneNumber", { required: true })}
              />

              <FormErrorMessage
                mt={"8px"}
                fontSize="12px"
                fontFamily={"Mulish"}
              >
                {" "}
                {errors.phoneNumber?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.examLocation}
              id="ExamLocation"
              h="84px"
            >
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Preffered Exam Location
              </FormLabel>
              <Select
                options={options}
                instanceId="examLocation"
                {...register("examLocation", { required: true })}
                onChange={(e: any) => setValue("examLocation", e?.value || "")}
                placeholder=" "
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: "4px",
                    outline: "none",
                    boxShadow: "none",
                    background: "#F9FAFF",
                    borderColor: "#E0E7FF",
                    fontSize: "14px",
                    fontFamily: "Mulish",
                    fontWeight: "600",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "rgba(48, 20, 70, 0.7);",
                    fontSize: "14px",
                    background: state.isSelected ? "#F9FAFF" : "#fff",
                  }),
                }}
              />

              <FormErrorMessage
                mt={"8px"}
                fontSize="12px"
                fontFamily={"Mulish"}
              >
                {errors.examLocation?.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <Heading
            as="h1"
            fontSize="24px"
            mt={{ base: "72px", lg: "78px" }}
            color="#301446"
            fontWeight="600"
            fontFamily={"Montserrat"}
          >
            School Details
          </Heading>
          <FormControl
            h="84px"
            isInvalid={!!errors.name}
            id="name"
            mt="32px"
            //  mb={{ base: "26px", lg: "0" }}
          >
            <FormLabel
              opacity="0.7"
              color="#301446"
              fontSize="14px"
              fontFamily={"Mulish"}
              fontWeight="600"
              mb="8px"
            >
              School Name
            </FormLabel>
            <Input
              opacity="0.7"
              color="#301446"
              fontSize="14px"
              fontFamily={"Mulish"}
              fontWeight="600"
              placeholder="El-Amin International School"
              type="text"
              {...register("name", { required: true })}
            />
            <FormErrorMessage mt={"8px"} fontSize="12px" fontFamily={"Mulish"}>
              {errors.name?.message}
            </FormErrorMessage>
          </FormControl>
          <SimpleGrid
            columns={[1, null, 3]}
            spacingX="26px"
            spacingY="26px"
            mt={{ base: "32px" }}
          >
            <FormControl h="84px">
              <FormLabel
                htmlFor="principal-name"
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                School Country
              </FormLabel>

              <InputGroup
                borderRadius="4px"
                bg="#F9FAFF"
                h="40px"
                border="1px solid #E0E7FF"
              >
                <InputLeftAddon
                  pointerEvents="none"
                  fontSize="1.2em"
                  p="12px"
                  bg="#F9FAFF"
                  h="38px"
                >
                  <Image src="/flag.svg" alt="flag" w={"18px"} />
                </InputLeftAddon>
                <Input
                  h="38px"
                  //  _hover={{ border: "none" }}
                  id="schoolCountry"
                  name="schoolCountry"
                  isReadOnly={true}
                  value="Nigeria"
                  color="rgba(48,20,70,0.7)"
                  fontSize="14px"
                  fontFamily={"Mulish"}
                  fontWeight="600"
                  pl="10px"
                  pointerEvents={'none'}
                />
              </InputGroup>
            </FormControl>
            <FormControl
              isInvalid={!!errors.schoolLocation}
              id="schoolLocation"
              h="84px"
            >
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Exam Location
              </FormLabel>
              <Select
                options={options}
                instanceId="schoolLocation"
                {...register("schoolLocation", { required: true })}
                onChange={(e: any) =>
                  setValue("schoolLocation", e?.value || "")
                }
                placeholder=" "
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderRadius: "4px",
                    outline: "none",
                    boxShadow: "none",
                    background: "#F9FAFF",
                    borderColor: "#E0E7FF",
                    fontSize: "14px",
                    fontFamily: "Mulish",
                    fontWeight: "600",
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: "rgba(48, 20, 70, 0.7);",
                    fontSize: "14px",
                    fontFamily: "Mulish",
                    fontWeight: "600",
                    background: state.isSelected ? "#F9FAFF" : "#fff",
                  }),
                }}
              />
            </FormControl>
          </SimpleGrid>
          <SimpleGrid
            columns={[1, null, 3]}
            spacingX="26px"
            spacingY="26px"
            mt="32px"
          >
            <FormControl id="email" isInvalid={!!errors.email} h="84px">
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Principal&apos;s Email Address
              </FormLabel>
              <Input
                bg="#F9FAFF"
                type="email"
                {...register("email", { required: true })}
              />
              <FormErrorMessage
                mt={"8px"}
                fontSize="12px"
                fontFamily={"Mulish"}
              >
                {errors.email?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="pname"
              isInvalid={!!errors.representativeName}
              h="84px"
            >
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Name of Principal / Head of School
              </FormLabel>
              <Input
                bg="#F9FAFF"
                type="string"
                {...register("representativeName", { required: true })}
              />
              <FormErrorMessage
                mt={"8px"}
                fontSize="12px"
                fontFamily={"Mulish"}
              >
                {errors.representativeName?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              h="84px"
              id="representativePhone"
              isInvalid={!!errors.representativePhone}
            >
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
                mb="8px"
              >
                Principal&apos;s Phone Number
              </FormLabel>
              <Input
                maxLength={10}
                bg="#F9FAFF"
                type="string"
                {...register("representativePhone", { required: true })}
              />
              {errors.representativePhone && (
                <FormErrorMessage
                  mt={"8px"}
                  fontSize="12px"
                  fontFamily={"Mulish"}
                >
                  {" "}
                  {errors.representativePhone.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>

          <Flex mt="72px" mb="39px">
            <Spacer />
            <Button
              width="128px !important"
              height="56px !important"
              fontSize="18px !important"
              fontWeight="700"
              bg="#EA7052"
              color={"brand.white"}
              fontFamily="Mulish"
              letterSpacing={"0.4px"}
              type="submit"
            >
              Submit
            </Button>
          </Flex>
        </Box>
      </Container>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size="lg"
      >
        <AlertDialogOverlay>
          <AlertDialogContent p="20px" borderRadius="16px">
            <AlertDialogHeader
              fontWeight="bold"
              fontSize={{ base: "24px", lg: "32px" }}
              lineHeight="110%"
              fontFamily={"Montserrat"}
              color="brand.purple"
              textAlign="center"
            >
              Are you sure you want to cancel your registration?
            </AlertDialogHeader>

            <AlertDialogBody
              fontSize={{ base: "16px", lg: "18px" }}
              mt="30px"
              textAlign="center"
              fontFamily={"Mulish"}
              color="brand.purple"
              opacity="0.7"
            >
              Kindly confirm if you want to cancel the registration process.
            </AlertDialogBody>

            <AlertDialogFooter
              mt="30px"
              justifyContent={"space-between"}
              display="flex"
              flexDir={{ base: "column", lg: "row" }}
            >
              <Button
                //ref={cancelRef}
                onClick={onClose}
                as="a"
                href="/"
                bg="#EA7052"
                color="#fff"
                h="56px"
                w={{ base: "full", lg: "148px" }}
                borderRadius="10px"
                fontFamily={"Mulish"}
                fontSize={"18px"}
              >
                Confirm
              </Button>
              <Button
                border="1px solid  rgba(48, 20, 70, 0.7)"
                bg="#fff"
                onClick={onClose}
                ml={3}
                mt={{ base: "10px", lg: "0px" }}
                color=" rgba(48, 20, 70, 0.7)"
                h="56px"
                w={{ base: "full", lg: "220px" }}
                borderRadius="10px"
                fontFamily={"Mulish"}
                fontSize={"18px"}
                fontWeight="700"
              >
                Back to Registration
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Regstudent;

const Instructions = () => {
  const rules = [
    "Student MUST have an accessible uLesson account. Click here to sign up on uLesson.",
    "Fill in School details in fields provided.",
    "Complete your personal details",
    "Please ensure that the mobile number you provide is the same as the contact on your uLesson account. ",
    "Review and submit your details.",
    "This competition is open to schools and students in Nigeria only",
  ];

  return (
    <>
      {rules.map((rule, index) => {
        return (
          <Flex mt="20px" key={index}>
            <Center>
              <Image
                loading="lazy"
                w="24.41px !important"
                h="24.12px"
                alt="icon"
                src="/bx_check.svg"
              />
            </Center>{" "}
            <Text
              fontSize="16px"
              fontWeight="600"
              ml={{ base: "8px", lg: "1.4rem" }}
              opacity="0.7"
              color="#301446"
              letterSpacing="-0.01em"
              fontStyle="normal"
              fontFamily={"Mulish"}
            >
              {rule}
            </Text>
          </Flex>
        );
      })}
    </>
  );
};
