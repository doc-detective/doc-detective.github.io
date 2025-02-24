import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<"svg">>;
	description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		title: "Keep procedures, screenshots, and videos current",
		Svg: require("@site/static/img/ui.svg").default,
		description: (
			<>
				Automate freshness checks for your procedures. Make sure page elements
				say what they should and update your media all in one go.
			</>
		),
	},
	{
		title: "Make sure your requests return what you expect",
		Svg: require("@site/static/img/api.svg").default,
		description: (
			<>
				Use the same checks on your APIs as you do on your UI. Make sure your
				APIs return the right data, and that it's formatted correctly.
			</>
		),
	},
	{
		title: "Catch surprises before your users do",
		Svg: require("@site/static/img/cli.svg").default,
		description: (
			<>
				Test your CLIs and SDKs like you do everything else. Run whatever
				commands you need and compare the output to what you expect.
			</>
		),
	},
];

function Feature({ title, Svg, description }: FeatureItem) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
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
