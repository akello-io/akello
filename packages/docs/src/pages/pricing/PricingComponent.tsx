import { CheckCircleIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-basic',
    href: 'https://app.akello.io',
    price: { monthly: '$15', annually: '$12' },
    price_custom: 'FREE',
    description: 'Everything necessary to start. Ideal for teams starting MBC.',
    features: [
      '100 active patients', 
      'CoCM Billing',             
    ],
    cta_btn: 'mt-10 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    cta: 'Start now'    
  },
  {
    name: 'Individual',
    id: 'tier-essential',
    href: 'https://app.akello.io',
    price: { monthly: '$30', annually: '$499' },
    description: 'Everything in Starter, plus increased data retention and BAA.',
    features: [
      'Unlimited patients',
      'Access premium integrations',
      'BAA included',
      '24/7 support response time'      
    ],
    cta_btn: 'mt-10 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    cta: 'Start now'    
  },
  {
    name: 'Teams',
    id: 'tier-growth',
    href: 'https://app.akello.io',
    price: { monthly: '$60', annually: '$48' },
    price_custom: 'Custom',
    description: 'Everything in Individual, plus collaboration tools and deeper insights.',
    features: [
      'Unlimited users',
      'Unlimited registeries',
      'AI/ML Classification models',
      'Enterprise capabilities',
      'Custom integrations'      
    ],
    cta_btn: 'mt-10 block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold leading-6 text-black shadow-sm',
    cta: 'Contact us' 
  },
]

export default function Example() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 ">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Run and grow your MBC programs
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8  sm:text-center">
        Get started for free by signing up, and grow with your needs.
        </p>
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y  sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                <h3 id={tier.id} className="text-base font-semibold leading-7 ">
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  {
                    tier.price_custom ? (
                      <span className="text-5xl font-bold tracking-tight "> {tier.price_custom} </span>
                    ) : (
                      <>
                        <span className="text-5xl font-bold tracking-tight ">{tier.price.annually}</span>
                        <span className="text-sm font-semibold leading-6 ">/year</span>
                      </>
                    )
                  }
                  
                </p>                
                <a
                      href={tier.href}
                      aria-describedby={tier.id}
                      className={tier.cta_btn}
                    >
                  {tier.cta}
                </a>
                        
                <p className="mt-10 text-sm font-semibold leading-6 ">{tier.description}</p>
                <ul role="list" className="mt-6 space-y-3 text-sm leading-6 ">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
