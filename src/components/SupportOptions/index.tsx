import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  link: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  // {
  //   title: "Contribute Your Skills",
  //   link: "/docs/contribute",
  //   Svg: require("@site/static/img/opencollective.svg").default,
  //   description: (
  //     <>
  //       Whether you know code, docs, UX, bug reports, or much anything else, we
  //       welcome contributions from everyone.
  //     </>
  //   ),
  // },
  {
    title: "Open Collective",
    link: "https://opencollective.com/doc-detective",
    Svg: require("@site/static/img/opencollective.svg").default,
    description: (
      <>
        You can support us via Open Collective. Check out the contribution tiers
        for benefits like featuring your logo on our website and repos.
      </>
    ),
  },
  {
    title: "GitHub Sponsors",
    link: "https://github.com/sponsors/doc-detective",
    Svg: require("@site/static/img/github.svg").default,
    description: (
      <>
        You can also support us via GitHub Sponsors. Check out the contribution
        tiers for benefits like featuring your logo on our website and repos.
      </>
    ),
  },
  {
    title: "Swag Shop",
    link: "https://shop.doc-detective.com",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Want to show your support with some swag? Check out our swag shop and
        get some cool Doc Detective gear.
      </>
    ),
  },
];

function Feature({ title, link, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Link to={link}>
          <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Link to={link}>
          <Heading as="h3">{title}</Heading>
        </Link>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
