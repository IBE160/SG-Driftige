"use client";

import { VStack } from "@chakra-ui/react";
import dynamic from 'next/dynamic';

const InputTabs = dynamic(() => import('../src/app/input-screen/InputTabs'), { ssr: false });

export default function Home() {
  return (
    <VStack>
      <InputTabs />
    </VStack>
  );
}
