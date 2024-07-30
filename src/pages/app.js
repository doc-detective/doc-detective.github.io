import React from "react";
import { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { components, schemas } from "doc-detective-common";

export default function MyReactPage() {
  const [formValue, setFormValue] = useState({});
  const handleFormChange = (value) => {
    setFormValue(() => {
      removeEmptyValues(value);
      return value;
    });
  };

  const removeEmptyValues = (obj) => {
    // console.log(`Removing empty values from ${JSON.stringify(obj)}`);
    Object.keys(obj).forEach((key) => {
      if (
        obj[key] &&
        !Array.isArray(obj) &&
        typeof obj[key] === "object" &&
        Object.keys(obj[key]).length > 0
      )
        removeEmptyValues(obj[key]);
      if (
        // Empty string, empty array, or empty object.
        obj[key] === "" ||
        (Array.isArray(obj[key]) && obj[key].length === 0) ||
        (typeof obj[key] === "object" && Object.keys(obj[key]).length === 0)
      )
        delete obj[key];
    });
    // console.log(`Removed empty values from ${JSON.stringify(obj)}`);
    return obj;
  };

  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
      {schemas.checkLink_v2 ? (
        <components.SchemaField
          key="form"
          schema={schemas.checkLink_v2}
          passValueToParent={handleFormChange}
        />
      ) : (
        <p>Error: Schema checkLink_v2 is undefined</p>
      )}
    </Layout>
  );
}
