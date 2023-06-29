"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/Input";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import Code from "./Code";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Paragraph from "./ui/Paragraph";

type Inputs = {
  text1: string;
  text2: string;
};

const Tester = ({ apiKey }: { apiKey: string }) => {
  const [response, setResponse] = useState({text1:"Waiting for text",text2:"Enter text and submit",similarity:null,success:null});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetchResponse(data);
  };

  const  fetchResponse = (data:{text1:string,text2:string}) => {
    fetch("/api/v1/similarity", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setResponse(res));
  };


  return (
    <div className="max-w-5xl md:grid md:grid-cols-2 flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Paragraph>Endpoint:</Paragraph>
          <Input
            value={"/api/v1/similarity"}
            className="w-fit truncate"
            readOnly
            copy
          />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4">
          <Paragraph>Method{" "}&nbsp;: </Paragraph>
          <Input
            value={"POST"}
            className="w-fit truncate"
            readOnly
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-8"
        >
          <Input
            {...register("text1", { required: true })}
            placeholder="text1"
            className="w-full"
          />
          <Input
            {...register("text2", { required: true })}
            placeholder="text2"
            className="w-full"
          />
          <Button
            type="submit"
            variant={"default"}
            className="w-fit self-start"
          >
            Submit
          </Button>
        </form>
      </div>

      <div className="flex flex-col max-w-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-lg border-slate-300 border-[1px] dark:border-slate-700  p-10">
        <SimpleBar>
          <Code
            code={JSON.stringify(response)
              .replace(/,/g, ",\n")
              .replace(/{/g, "{\n")
              .replace(/}/g, "\n}")}
            language="json"
            show={!!response}
            animated={true}
          />
        </SimpleBar>
      </div>
    </div>
  );
};

export default Tester;
