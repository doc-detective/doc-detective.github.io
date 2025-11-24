import React from "react";
import Layout from "@theme/Layout";
import schemas from "@site/src/schemas/schemas.json";
import SchemaForm from "@site/src/components/SchemaForms/SchemaForm";
import Builder from "@site/src/components/Builder";

export default function Form() {
  return (
    <Layout>{<Builder />}</Layout>
  );
}
