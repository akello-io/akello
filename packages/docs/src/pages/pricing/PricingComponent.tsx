import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Individual',
    id: 'tier-hobby',
    href: '#',
    priceYearly: '$499',
    description: 'For individual care managers that want to receive CoCM reimbursements.',
    features: [
        'BAA contract',
        'CoCM Billing Reports',
        'Caseload management automations'
    ],
  },
  {
    name: 'Teams',
    id: 'tier-team',
    href: '#',
    priceYearly: '$79',
    custom_price: 'Custom',
    description: 'For teams that want to adopt and grow CoCM programs.',
    features: [
      'Unlimited users',
      'Unlimited registeries',
      'AI/ML Classification models',
      'Enterprise capabilities'      
    ],
  },
]

export default function Example() {
  return (
    <div className="isolate overflow-hidden ">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 ">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Run and grow your MBC programs
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8 ">
            Get started for free by signing up, and grow with your needs.
          </p>
          
        </div>
      </div>
      <div className="flow-root pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 ">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-3xl p-8 shadow-xl ring-1  sm:p-10"
                >
                  <div>
                    <h3 id={tier.id} className="text-base font-semibold leading-7 ">
                      {tier.name}
                    </h3>                    
                    <div className="mt-4 flex items-baseline gap-x-2">
                        {
                            tier.custom_price && (
                                <span className="text-5xl font-bold tracking-tight">{tier.custom_price}</span>
                            )
                        }                        
                        {
                            !tier.custom_price && (
                                <>
                                    <span className="text-5xl font-bold tracking-tight ">{tier.priceYearly}</span>
                                    <span className="text-base font-semibold leading-7">/year</span>
                                </>
                            )
                        }
                      
                    </div>
                    <p className="mt-6 text-base leading-7">{tier.description}</p>
                    <ul role="list" className="mt-10 space-y-4 text-sm leading-6 ">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon className="h-6 w-5 flex-none " aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* 
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started today
                  </a>
                  */}
                </div>
              ))}
              <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
                <div className="lg:min-w-0 lg:flex-1">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight ">Nonprofits</h3>
                  <p className="mt-1 text-base leading-7 ">
                    Are you a nonprofit organization? You might be able to access Akello at a deeply discounted rate.
                  </p>
                </div>
                <a
                  href="#"
                  className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 ring-1 ring-inset ring-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Contact us <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
