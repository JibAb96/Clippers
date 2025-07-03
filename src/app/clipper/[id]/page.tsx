import React from "react";
import ClipperProfile from "./components/ClipperProfile";

const Page = ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const clipper = React.use(params);
  return <ClipperProfile id={clipper.id} />;
};

export default Page;
