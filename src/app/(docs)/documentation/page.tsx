import DocumentationTabs from "@/components/DocumentationTabs";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Similarity API | Documentation",
  description: "Free and Open Source  ",
};

const Documentation = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-12 ">
      <div className="flex flex-col items-center gap-6 ">
        <LargeHeading> Making A Request</LargeHeading>
        <Paragraph size={"default"}>/api/v1</Paragraph>
        <DocumentationTabs></DocumentationTabs>
      </div>
    </div>
  );
};

export default Documentation;
