import React, { useState } from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
    salary: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      department: "",
      salary: "",
      userId: "",
    });
  };

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh">
      <Heading mb={6}>Add New Employee</Heading>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <FormControl mb={4} isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Department</FormLabel>
          <Input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Salary</FormLabel>
          <Input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>User ID</FormLabel>
          <Input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Add Employee
        </Button>
      </form>
    </Flex>
  );
};

export default Dashboard;
