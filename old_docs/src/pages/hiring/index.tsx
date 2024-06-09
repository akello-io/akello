import { UserGroupIcon, BoltIcon, ScaleIcon } from '@heroicons/react/20/solid'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Hero from './hero';


export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout>
        <Hero />

    </Layout>
  );
}



