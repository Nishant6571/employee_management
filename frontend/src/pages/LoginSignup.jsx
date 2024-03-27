import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const LoginSignup = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Email:", loginEmail);
    console.log("Login Password:", loginPassword);

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email: loginEmail,
        password: loginPassword,
      });
      console.log(response.data);
      if (response.status === 200) {
        setModalMessage("User logged in Successfully.");
        setShowModal(true);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response.request.status === 401) {
        setModalMessage("Wrong credentials");
        setShowModal(true);
      }
      console.error("Error:", error);
    }
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Email:", signupEmail);
    console.log("Signup Password:", signupPassword);
    console.log("Confirm Password:", confirmPassword);

    if (signupPassword !== confirmPassword) {
      setModalMessage("Passwords don't match!");
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/users/signup", {
        email: signupEmail,
        password: signupPassword,
      });

      if (response.data.msg === "User registered successfully.") {
        setModalMessage("Registration Successful!");
        setShowModal(true);
      }
      if (
        response.data.msg === "User already Registered. Try with another Email."
      ) {
        setModalMessage("User Already Exists!");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setSignupEmail("");
    setSignupPassword("");
    setConfirmPassword("");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage === "Registration Successful!") {
      toggleForm();
    }
  };

  return (
    <Flex align="center" justify="center" minHeight="100vh">
      <Stack
        spacing={6}
        width="400px"
        padding={6}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading size="lg" textAlign="center">
          {isLogin ? "Login" : "Sign Up"}
        </Heading>
        {isLogin ? (
          <form
            style={{ display: "flex", gap: "20px", flexDirection: "column" }}
            onSubmit={handleLoginSubmit}
          >
            <FormControl id="loginEmail" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="loginPassword" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" isFullWidth>
              Login
            </Button>
          </form>
        ) : (
          <form
            style={{ display: "flex", gap: "20px", flexDirection: "column" }}
            onSubmit={handleSignupSubmit}
          >
            <FormControl id="signupEmail" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl id="signupPassword" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" isFullWidth>
              Sign Up
            </Button>
          </form>
        )}
        <Button variant="link" onClick={toggleForm} textAlign="center">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Button>
      </Stack>

      <Modal isOpen={showModal} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalMessage}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            {modalMessage === "User Already Exists!" ? (
              <Text>Please login with your existing account.</Text>
            ) : modalMessage === "Passwords don't match!" ? (
              <Text>Passwords don't match. Please try again.</Text>
            ) : null}
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default LoginSignup;
