"use client";

import { Button, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function TextInput() {
  const [text, setText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleGenerate = () => {
    console.log("Preparing to process the following text:");
    console.log(text);
    // In a future step, this will send the text to the backend.
  };

  return (
    <VStack spacing={4} width="100%">
      <Textarea
        placeholder="Paste your text here"
        value={text}
        onChange={handleInputChange}
        size="lg"
        height="300px"
      />
      <Button colorScheme="blue" onClick={handleGenerate} alignSelf="flex-end">
        Generate
      </Button>
    </VStack>
  );
}
