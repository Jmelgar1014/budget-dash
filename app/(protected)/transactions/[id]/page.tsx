import React from "react";
import { use } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return (
    <>
      <div>PageId:{id}</div>
    </>
  );
};

export default Page;
