import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import SupportOptions from "@site/src/components/SupportOptions";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function SupportHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Support ❤️ {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          Whether you want to contribute skills, funds, or closet space,
          <br />
          we have options for how you can help make Doc Detective even better.
        </p>
      </div>
    </header>
  );
}

export default function Support(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Support ❤️ ${siteConfig.title}`}
      description="Support Doc Detective"
    >
      <SupportHeader />
      <main>
        <SupportOptions />
      </main>
    </Layout>
  );
}
