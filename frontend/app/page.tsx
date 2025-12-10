"use client";

import { VStack } from "@chakra-ui/react";
import dynamic from 'next/dynamic';

const InputTabs = dynamic(() => import('../src/app/input-screen/InputTabs'), { ssr: false });

export default function Home() {
  return (
    <VStack spacing={4} p={8} width="100%">
      <InputTabs />
    </VStack>
  );
}
