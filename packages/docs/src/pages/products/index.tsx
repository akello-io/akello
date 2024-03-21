import { UserGroupIcon, BoltIcon, ScaleIcon } from '@heroicons/react/20/solid'


import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import img1 from '@site/static/img/unsplash1.jpg';
import img2 from '@site/static/img/unsplash-2.jpg';
import img3 from '@site/static/img/unsplash-3.jpg';


const features = [
    {
      name: 'Team-based Care',
      description:
        'Built in services to help enable clinical teams to collaborate on patient populations.',
      href: '/docs/intro',
      icon: UserGroupIcon,
      img: img1
    },
    {
      name: 'AI/ML enabled Population Health',
      description:
        'Manage large populations more effectively with out of the box AI/ML tools to help automate workflows.',
      href: '/docs/intro',
      icon: BoltIcon,
      img: img2
    },
    {
      name: 'Measurement Based Care',
      description:
        'Built in measurement based care tools to help track patient outcomes and improve care.',
      href: '/docs/intro',
      icon: ScaleIcon,
      img: img3
    },
  ]

  
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
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 ">Launch mental health apps faster</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Enterprise Open Source for Mental Health
                </p>
                <p className="mt-6 text-lg leading-8 ">
                    Invest engineering resources in building the features that make your app unique, not the infrastructure.
                </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col">
                        <img className='max-h-96' src={feature.img} />
                        <dt className="mt-4 flex items-center gap-x-3 text-base font-semibold leading-7 ">                        
                          {feature.name}
                        </dt>
                        <dd className="mt-4 mx-0 flex flex-auto flex-col text-base leading-7 ">
                          <p className="flex-auto">{feature.description}</p>
                            <p className="mt-6">
                                <a href={feature.href} className="text-sm font-semibold leading-6 ">
                                Learn more <span aria-hidden="true">→</span>
                                </a>
                            </p>
                        </dd>
                    </div>
                    ))}
                </dl>
                </div>
            </div>
            </div>
    </Layout>
  );
}



