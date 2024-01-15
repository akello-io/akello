import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Measurement Based Care',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Run any clinical screeners such as PHQ-9, GAD-7 or create your own to  to regularly assess the health of a patient population.
      </>
    ),
  },
  {
    title: 'Treat-to-Target',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Define a treatment target (such as remission or low disease activity) and work collaboratively with other clinical team members to  manage a population.
      </>
    ),
  },
  {
    title: 'Billing',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Make billing for CoCM much simpler with built in financial modeling support, time tracking, reports and more.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
        {/*
            <div className="mx-auto">
                <Svg className={styles.featureSvg} role="img" />
            </div>
        */}
      <div className="text--center padding-horiz--md">
          <div className={"text-2xl font-semibold"}>{title}</div>
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
