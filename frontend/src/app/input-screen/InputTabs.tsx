"use client";

import { Tabs } from "@chakra-ui/react";
import TextInput from "./TextInput";
import PdfUpload from "./PdfUpload";

export default function InputTabs() {
  return (
    <Tabs.Root defaultValue="text" fitted variant="enclosed" width="100%">
      <Tabs.List>
        <Tabs.Trigger value="text">Text Input</Tabs.Trigger>
        <Tabs.Trigger value="pdf">PDF Upload</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="text">
        <TextInput />
      </Tabs.Content>
      <Tabs.Content value="pdf">
        <PdfUpload />
      </Tabs.Content>
    </Tabs.Root>
  );
}
