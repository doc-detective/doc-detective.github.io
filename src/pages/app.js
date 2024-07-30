import React from "react";
import Layout from "@theme/Layout";
import "./app.module.css";
import { schemas } from "doc-detective-common";
import SchemaForm from "@site/src/components/SchemaForms/SchemaForm";
import Builder from "@site/src/components/Builder";

export default function Form() {
  return (
    <Layout>{<Builder />}</Layout>
  );
}
