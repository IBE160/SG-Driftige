"use client";

import { Box, Button, VStack, Text, HStack } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function PdfUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (selectedFile) {
      console.log("Preparing to process the following file:");
      console.log(selectedFile);
      // In a future step, this will send the file to the backend.
    }
  };

  return (
    <VStack spacing={4} width="100%">
      <Box
        p={8}
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="md"
        textAlign="center"
        width="100%"
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="application/pdf"
          onChange={onFileChange}
          data-testid="pdf-upload-input"
        />
        <p>Drag and drop your PDF here, or</p>
        <Button colorScheme="blue" onClick={onButtonClick} mt={4}>
          Upload PDF
        </Button>
        {selectedFile && (
          <Text mt={4} fontSize="sm" color="gray.500">
            Selected file: {selectedFile.name}
          </Text>
        )}
      </Box>
      <HStack width="100%" justifyContent="flex-end">
        <Button
          colorScheme="blue"
          onClick={handleGenerate}
          isDisabled={!selectedFile}
        >
          Generate
        </Button>
      </HStack>
    </VStack>
  );
}
