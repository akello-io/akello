import { UserGroupIcon, BoltIcon, ScaleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import PricingComponent from './PricingV2'

  
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
      <header className="">
          <div className="container mx-auto text-center py-24">
              <h1 className="text-4xl font-bold">{siteConfig.title}</h1>
              <p className="text-xl py-6">{siteConfig.tagline}</p>
          </div>
      </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout>
      <PricingComponent />
        
    </Layout>
  );
}



