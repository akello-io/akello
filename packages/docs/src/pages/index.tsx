import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
      <header className="">
          <div className="container mx-auto text-center py-24">
              <h1 className="text-4xl font-bold">{siteConfig.title}</h1>
              <p className="text-xl py-6">{siteConfig.tagline}</p>

              <div className="py-10">
                  <Link
                      className="bg-white rounded-md text-gray-500 px-4 py-2"
                      to="/docs/intro"
                  >
                      Get started with Akello in - 5min ⏱️
                  </Link>
              </div>
          </div>
      </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
