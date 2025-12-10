"use client";

import { VStack } from "@chakra-ui/react";
import TextInput from "../src/app/input-screen/TextInput";

export default function Home() {
  return (
    <VStack spacing={4} p={8}>
      <TextInput />
    </VStack>
  );
}
