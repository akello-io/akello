import { UserGroupIcon, BoltIcon, ScaleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';


import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const frequencies = [ 
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]
const tiers = [
  {
    name: 'Open Source',
    id: 'tier-hobby',
    href: '#',
    custom_price: 'Free',    
    price: { monthly: '$15', annually: '$144' },
    description: 'Access to all our open source code and community support',
    features: ['Open Source Code', 'AWS Infrastructure Scripts', 'All Unit Tests', 'Documentation', 'Community Support'],
    mostPopular: false,
  },
  {
    name: 'Individual',
    id: 'tier-freelancer',
    href: '#',    
    price: { monthly: '$500', annually: '$99' },
    description: 'Designed for individuals starting to use CoCM',
    features: ['1 registry', 'Up to 100 active patients', 'Billing report', 'Automated time tracking'],
    mostPopular: false,
  },
  {
    name: 'Teams',
    id: 'tier-startup',
    href: '#',    
    price: { monthly: '$60', annually: '$2,0000' },
    description: 'For teams that want to scale up programs',
    features: [
      'Unlimited registries',      
      'Role-based access controls'      
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise Edition',
    id: 'tier-enterprise',
    href: '#',  
    custom_price: 'Custom',    
    description: 'For customers that need enterprise needs.',
    features: [
      'Custom integrations',
      'Enterprise integrations',      
      'Enterprise support'
    ],
    mostPopular: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function PricingComponent() {
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 ">
          We help support you from starting CoCM, adoption it and scaling up your programs.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-1 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>

            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                'rounded-3xl p-8'
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.mostPopular ? 'text-indigo-600' : '',
                  'text-lg font-semibold leading-8'
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 ">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                {
                  tier.custom_price ? 
                  <span className="text-4xl font-bold tracking-tight">{tier.custom_price}</span>
                  : (
                    <>
                      <span className="text-4xl font-bold tracking-tight ">{tier.price[frequency.value]}</span>
                      <span className="text-sm font-semibold leading-6 ">{frequency.priceSuffix}</span>
                    </>
                  )
                }
                
              </p>
              {/* 
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                Buy plan
              </a>
              */}
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 ">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


  
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



