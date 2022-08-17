import React, { useState } from "react";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
//import { TriangleDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Select from "react-select";

const options = [
  { value: "Lagos", label: "Lagos" },
  { value: "Nigeria", label: "Nigeria" },
];
const gender = [
  { value: "female", label: "female" },
  { value: "male", label: "male" },
];
const grades = [
  { value: "Senior Secondary", label: "Senior Secondary" },
  { value: "Junior Secondary", label: "Junior Secondary" },
];

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
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object().shape({
  name: yup.string().required("First name is required"),
  representativeEmail: yup
    .string()
    .email()
    .required("This is a required field"),
  representativePhone: yup
    .string()
    .required("This is a required field")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number should be of 10 digits only")
    .max(10, "Phone number should be of 10 digits only"),
  students: yup
    .array()
    .of(
      yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        ulessonNumber: yup
          .string()
          .required("This is a required field")
          .matches(phoneRegExp, "Phone number is not valid")
          .min(10, "Phone number should be of 10 digits only")
          .max(10, "Phone number should be of 10 digits only"),
      })
    )
    .required(),
});
interface FormValues {
  //country:string;
  name: string;
  gender: GenderEnum;
  gradeGroup: gradeGroups;
  competitionCategory: string;
  examLocation: ExamLocationenum;
  schoolLocation: ExamLocationenum;
  representativeEmail: string;
  representativeName: string;
  representativePhone: string;
  //schoolContact
  students: {
    firstName: string;
    lastName: string;
    gender: GenderEnum;
    dateOfBirth: Date;
    gradeGroup: string;
    competitionCategory: string;
    class: string;
    ulessonNumber: number;
    // examLocation: ExamLocationenum
  }[];
}

function Regschool() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const onSubmit = async (data: any) => {
    try {
      let reqObj = {
        name: data.name,
        schoolLocation: data.schoolLocation,
        schoolContact: data.representativePhone,
        examLocation: data.examLocation,
        representativePhone: data.representativePhone,
        representativeEmail: data.representativeEmail,
        representativeName: "Aman",
        country: "India",
        contestId: "62bd82a6138c991f5e1f9dba",
        students: [
          {
            firstName: "data.firstName",
            lastName: "data.lastName",
            gradeGroup: "Junior",
            gender: "Male",
            dateOfBirth: "2022-06-16",
            competitionCategory: "full stack",
            examLocation: "Lucknow",
            class: "12",
            phoneNumber: "+91 7309908905",
          },
        ],
      };
      const response = await axios({
        method: "post",
        url: "http://13.235.19.203:8080/school/",
        data: reqObj,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if(response.status==201)
      router.replace("/congrats-school");
    } catch (error) {
      console.log(error);
    }
    console.log(data);

    //alert(JSON.stringify(data));

    //router.replace("/congrats-school");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  //console.log(errors);
  const { fields, append, remove } = useFieldArray({
    name: "students",
    control,
  });

  const watchStudentsArray = watch("students");
  const Fields = fields.map((field, index) => {
    return {
      ...field,
      ...watchStudentsArray[index],
    };
  });
  //const [startDate, setStartDate] = useState<Date | null>();

  //console.log(Fields);

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
          uLesson Challenge Registration (Schools)
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
            School Details
          </Heading>
          <FormControl isInvalid={!!errors.name} id="name" mt="32px">
            <FormLabel
              opacity="0.7"
              color="#301446"
              fontSize="14px"
              fontFamily={"Mulish"}
              fontWeight="600"
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
            <Text color="brand.orange">
              {errors.name && "School Name is required"}
            </Text>
          </FormControl>
          <SimpleGrid
            columns={[1, null, 3]}
            spacingX="26px"
            spacingY="26px"
            mt={{ base: "26px", lg: "32px" }}
          >
            <FormControl>
              <FormLabel
                htmlFor="principal-name"
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
              >
                School Country
              </FormLabel>
              <InputGroup
                borderRadius="4px"
                bg="#F9FAFF"
                h="40px"
                border="1px solid #E0E7FF"
              >
                <InputLeftAddon pointerEvents="none" fontSize="1.2em" p="12px">
                  <Image src="/flag.svg" alt="flag" w={"18px"} />
                </InputLeftAddon>
                <Input
                  bg="#F9FAFF"
                  _focus={{ border: "none" }}
                  _hover={{ border: "none" }}
                  id="schoolCountry"
                  name="schoolCountry"
                  isReadOnly={true}
                  value="Nigeria"
                  color="rgba(48,20,70,0.7)"
                  fontSize="14px"
                  fontFamily={"Mulish"}
                  fontWeight="600"
                  border="none"
                  pl="10px"
                />
              </InputGroup>
            </FormControl>
            <FormControl
              id="schoolLocation"
              isInvalid={!!errors.schoolLocation}
            >
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
              >
                School Location
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
              <FormErrorMessage>
                {errors?.schoolLocation?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="examLocation">
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
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
            mt={{ base: "26px", lg: "32px" }}
            spacingY="26px"
          >
            <FormControl
              id="representativeEmail"
              isInvalid={!!errors.representativeEmail}
            >
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
              >
                Principal&apos;s Email Address
              </FormLabel>
              <Input
                bg="#F9FAFF"
                type="email"
                {...register("representativeEmail", { required: true })}
              />
              <Text color="brand.orange">
                {errors.representativeEmail &&
                  " Principal’s Email Address is required"}
              </Text>
            </FormControl>
            <FormControl
              
              isInvalid={!!errors?.representativePhone?.message}
              
            >
              <FormLabel
                opacity="0.7"
                color="#301446"
                fontSize="14px"
                fontFamily={"Mulish"}
                fontWeight="600"
              >
                Principal&apos;s Phone Number
              </FormLabel>
              <Input
                maxLength={10}
                bg="#F9FAFF"
                type="number"
                {...register("representativePhone", { required: true })}
              />
              {errors.representativePhone && (
                <FormErrorMessage>
                  {" "}
                  {errors.representativePhone.message}
                </FormErrorMessage>
              )}
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
            Student Details
          </Heading>
          <FormControl mt="50px">
            <FormLabel
              htmlFor="email"
              opacity="0.7"
              color="#301446"
              fontSize="14px"
            >
              How many candidates will you enter for the challenge?
            </FormLabel>
          </FormControl>
          <HStack maxW="135px" border="1px solid #E0E7FF" borderRadius="4px">
            <Button
              borderRadius="0px"
              h="40px"
              p="12px 19px"
              m="0"
              bg="#fff"
              onClick={() => remove(Fields.length - 1)}
              disabled={Fields.length === 1 ? true : false}
            >
              -
            </Button>

            <Input
           
              value={Fields.length}
              h="40px"
              borderRadius="0px"
              w="43px"
              ml="0px !important"
              bg="#F9FAFF"
              border="none"
              isReadOnly={true}
              //  {...register("student")}
              // {...input}
            />

            <Button
              borderRadius="0px"
              h="40px"
              p="12px 19px"
              ml="0px !important"
              bg="#fff"
              //</HStack>
              onClick={() => append({})}
            >
              +
            </Button>
          </HStack>
          {Fields.map((student: any, index: number) => {
            return (
              <Box key={student.id}>
                <Heading size="sm" fontSize="18px" mt="40px">
                  Student {index + 1}
                </Heading>
                <SimpleGrid
                  columns={[1, null, 4]}
                  spacingX="26px"
                  spacingY="26px"
                  mt="24px"
                >
                  <FormControl id="firstName">
                    <FormLabel
                      htmlFor="name"
                      opacity="0.7"
                      color="#301446"
                      fontSize="14px"
                      fontFamily={"Mulish"}
                      fontWeight="600"
                    >
                      First Name
                    </FormLabel>
                    <Input
                      bg="#F9FAFF"
                      placeholder=""
                      type="text"
                      {...register(`students.${index}.firstName`, {
                        required: true,
                      })}
                    />
                    <Text color="brand.orange">
                      {errors.students?.[index]?.firstName?.message &&
                        "First name is required"}
                    </Text>
                    {/* && "First name is required"} */}
                  </FormControl>
                  <FormControl id="lastName">
                    <FormLabel
                      htmlFor="name"
                      opacity="0.7"
                      color="#301446"
                      fontSize="14px"
                      fontFamily={"Mulish"}
                      fontWeight="600"
                    >
                      Last Name
                    </FormLabel>
                    <Input
                      bg="#F9FAFF"
                      placeholder=""
                      type="text"
                      {...register(`students.${index}.lastName`, {
                        required: true,
                      })}
                    />
                    <Text color="brand.orange">
                      {errors.students?.[index]?.lastName?.message &&
                        "last name is required"}
                    </Text>
                  </FormControl>
                  <FormControl id="gender">
                    <FormLabel
                      opacity="0.7"
                      color="#301446"
                      fontSize="14px"
                      fontFamily={"Mulish"}
                      fontWeight="600"
                    >
                      Gender
                    </FormLabel>
                    <Select
                      options={gender}
                      instanceId="gender"
                      {...register(`students.${index}.gender`, {
                        required: true,
                      })}
                      onChange={(e: any) =>
                        setValue(`students.${index}.gender`, e?.value || "")
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
                  <FormControl id="dateOfBirth">
                    <FormLabel
                      opacity="0.7"
                      color="#301446"
                      fontSize="14px"
                      fontFamily={"Mulish"}
                      fontWeight="600"
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
                        p="12px"
                        bg="#F9FAFF"
                      >
                        <Image src="/calender.svg" alt="calender" w={"16px"} />
                      </InputLeftAddon>
                      <FormLabel
                        fontStyle={"Mulish !important"}
                        fontWeight="600"
                        letterSpacing="-0.01em"
                        color={"#301446"}
                        fontSize="14px"
                        opacity="0.7"
                        p={2}
                        zIndex="1000000"
                        bg="#F9FAFF"
                      >
                        {" "}
                        <Controller
                          name={`students.${index}.dateOfBirth`}
                          control={control}
                          render={({ field }) => (
                            <ReactDatePicker
                              placeholderText="01/12/2002"
                              onChange={(date: Date) => field.onChange(date)}
                              selected={field.value}
                              dateFormat="dd/MM/yyyy"
                              // minDate={}
                              // maxDate={moment().subtract(25, "years")}
                              // showDisabledMonthNavigation
                              filterDate={(date) =>
                                date.getFullYear() > 1995 &&
                                date.getFullYear() < 2015
                              }
                              dropdownMode="select"
                              showYearDropdown
                              scrollableYearDropdown
                            />
                          )}
                        />
                      </FormLabel>
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>
                <SimpleGrid
                  columns={[1, null, 4]}
                  spacingX="26px"
                  spacingY="26px"
                  mt={{ base: "26px", lg: "15px" }}
                >
                  <FormControl id="gradeGroup">
                    <FormLabel
                      opacity="0.7"
                      color="#301446"
                      fontSize="14px"
                      fontFamily={"Mulish"}
                      fontWeight="600"
                    >
                      Grade Group
                    </FormLabel>
                    <Select
                      options={grades}
                      instanceId="gradeGroup"
                      {...register(`students.${index}.gradeGroup`, { required: true })}
                      onChange={(e: any) =>
                        setValue(`students.${index}.gradeGroup`, e?.value || "")
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

                  <FormControl id="competitionCategory">
                    <FormLabel
                      opacity="0.7"
                      color="#301446"
                      fontSize="14px"
                      fontFamily={"Mulish"}
                      fontWeight="600"
                    >
                      Competition Category
                    </FormLabel>
                    <Select
                      options={grades}
                     
                      {...register(`students.${index}.competitionCategory`, { required: true })}
                      onChange={(e: any) =>
                        setValue(`students.${index}.competitionCategory`, e?.value || "")
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

                  <FormControl id="class">
                    <FormLabel
                      opacity="0.7"
                      color="#301446"
                      fontSize="14px"
                      fontFamily={"Mulish"}
                      fontWeight="600"
                    >
                      Class
                    </FormLabel>
                    <Select
                      options={grades}
                      {...register(`students.${index}.class`, {
                        required: true,
                      })}
                      onChange={(e: any) =>
                        setValue(`students.${index}.class`, e?.value || "")
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

                    {/* <Select
                      opacity="0.7"
                      color="#301446"
                      fontSize="14px"
                      fontFamily={"Mulish"}
                      fontWeight="600"
                      bg="#F9FAFF"
                      icon={
                        <TriangleDownIcon
                          w={"10px !important"}
                          h={"10px !important"}
                          color="brand.purple"
                        />
                      }
                      {...register(`students.${index}.class`, {
                        required: true,
                      })}
                    >
                      <option value="SeniorSecondary">Senior Secondary</option>
                      <option value="JuniorSecondary">Junior Secondary</option>
                    </Select> */}
                  </FormControl>
                  <FormControl id="ulessonNumber">
                    <FormLabel
                      opacity="0.7"
                      color="#301446"
                      fontSize="14px"
                      fontFamily={"Mulish"}
                      fontWeight="600"
                    >
                      Registered uLesson Number
                    </FormLabel>
                    <Input
                      bg="#F9FAFF"
                      type="number"
                      {...register(`students.${index}.ulessonNumber`, {
                        required: true,
                      })}
                    />
                    <Text color="brand.orange">
                      {errors.students?.[index]?.ulessonNumber?.message }
                    </Text>
                  </FormControl>
                </SimpleGrid>
              </Box>
            );
          })}
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
              //onclick=() => {onSubmit}
              type="submit"
              //isLoading={isSubmitting}
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
                //ref={cancelRef.current}
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
export default Regschool;

const Instructions = () => {
  const rules = [
    "Identify students to enter for each of the four categories.",
    "Make sure each student  has an existing free or paid uLesson account.",
    "Students who do not have existing uLesson accounts can create for free. (available on Android, iOS, and web).",
    "Fill in School details in fields provided. ",
    "Please ensure that the mobile number provided for each student is the same as the contact they registered on the uLesson app.",
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
