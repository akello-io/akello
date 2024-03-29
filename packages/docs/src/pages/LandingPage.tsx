import {
    ArrowPathIcon,
    ChevronRightIcon,
    CloudArrowUpIcon,
    Cog6ToothIcon,
    FingerPrintIcon,
    LockClosedIcon,
    ServerIcon,        
    InboxIcon,
    TrashIcon
} from '@heroicons/react/20/solid'
import { BoltIcon, CalendarDaysIcon, UsersIcon } from '@heroicons/react/24/outline'
import HeroImg  from './hero.png'
import MeasurementImage from './landing-page-measurements.png'
import ClinicalModelsImage from './landing-page-clinical-models.png'
import TeamCollaborationImage from './landing-page-team-collaboration.png'
import { CopyBlock } from 'react-code-blocks';



const features = [
    {
      name: 'Streamline Measurements',
      description:
      "With Akello, you will have complete visibility with our real time patient monitoring service. You'll receive immediate notifications when patients deviate from their treatment plan.",
      imageSrc: MeasurementImage,
      imageAlt: '',
      cta: (
        <>
            <a
                href="/docs/measurements"
                className="text-sm font-semibold leading-6 "
            >
                Learn more <span aria-hidden="true">→</span>
            </a>
        </>
      )
    },
    {
      name: 'Quickly adapt Clinical Models',
      description:
        'Efficiently run clinical models all in one platform. Akello enables you to scale models and equip your clinic to accept value based payments.',
      imageSrc: ClinicalModelsImage,
      imageAlt: '',
      cta: (
        <>
            <a
                href="/docs/clinical-models"
                className="text-sm font-semibold leading-6 "
            >
                Learn more <span aria-hidden="true">→</span>
            </a>
        </>
      )
    },
    {
        name: 'Collaborate effectively',
        description:
          'Akello helps automate workflows for you and your team and supports a wide range of integrations, empowering your organization to do its best work.',
        imageSrc: TeamCollaborationImage,
        imageAlt: '',
        cta: (
            <>
                <a
                    href="/docs/team-based-care"
                    className="text-sm font-semibold leading-6 "
                >
                    Learn more <span aria-hidden="true">→</span>
                </a>
            </>
          )
    },
  ]

  const features2 = [
    {
      name: 'Patient Registry',
      description:
        'Our registry enables teams to run Treat-to-Target strategy in Collaborative Care Management (CoCM) to monitor individual health metrics closely, ensuring tailored interventions are timely and aligned with predefined clinical goals for optimal outcomes.',
      href: '/docs/patient-registry',
      icon: InboxIcon,
    },
    {
      name: 'Teams',
      description:
        'Work collaboratively and effectively by leveraging shared data insights, continuous communication, and specialized roles to dynamically adjust treatments and achieve targeted health outcomes efficiently.',
      href: '/docs/team-based-care',
      icon: UsersIcon,
    },
    {
      name: 'Billing Reports',
      description:
        'Automate the CoCM process by tracking clinical time spent on each patient, automating documentation, and simplifying billing procedures, thereby enhancing operational efficiency and financial accuracy.',
      href: '/docs/time-based-billing',
      icon: TrashIcon,
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Example() {

    const models = [
        {
            'name': 'CoCM',
            'link': '/docs/clinical-models/cocm'
        },
        {
            'name': 'SBIRT',
            'link': '/docs/clinical-models/sbirt'
        },
        {
            'name': 'PCBH',
            'link': '/docs/clinical-models/pcbh'
        },
        {
            'name': 'PCCM',
            'link': '/docs/clinical-models/pccm'
        },
        {
            'name': 'MedFT',
            'link': '/docs/clinical-models/MedFT'
        }                        
    ]

    return (
        <div className="bg-white dark:bg-black">
            <main>
                {/* Hero section */}
                <div className="relative isolate overflow-hidden">
                    <div className="mx-auto px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-24 lg:pt-40">
                        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">

                            <div className="mt-24 sm:mt-32 lg:mt-16">
                                <a href="https://github.com/akello-io/akello/releases/tag/v0.0.9" className="inline-flex hover:no-underline space-x-6">
                                    <span className="rounded-full px-3 py-1 text-sm font-semibold leading-6  ring-1 ring-inset ">
                                      Latest updates
                                    </span>
                                    <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6">
                                    <span>Just shipped v0.0.9</span>
                                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                </a>
                            </div>
                            <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
                                Measurement Based Care Infrastructure
                            </h1>
                            <p className="mt-6 text-lg leading-8">
                                A complete platform for teams to run measurement based care models. Get started with Akello for free today.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <a
                                    href="https://app.akello.io/signup"
                                    className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                >
                                    Get started
                                </a>
                                <a
                                    href="/docs/intro"
                                    className="rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                >
                                    Learn more
                                </a>
                            </div>
                        </div>
                        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                                <img
                                    src={HeroImg}
                                    alt="App screenshot"
                                    className="h-[34rem] "
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-black dark:bg-slate-900 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <h2 className="text-center text-lg font-semibold leading-8 text-white ">
                        Start getting reimbursed for proven healthcare models today.
                        </h2>
                        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                            {
                                models.map((model) => (
                                    <a className="text-white font-bold text-3xl col-span-2 max-h-12 w-auto object-contain lg:col-span-1" href={model.link}>
                                        {model.name}
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                ))
                            }                                                                                                
                        </div>
                    </div>
                    </div>



                    <div className="">
                        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                            <p className="mt-4 ">
                                How does Akello work?
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">Akello helps you run and scale</h2>                                                        
                            </div>

                            <div className="mt-16 space-y-16">
                                {features.map((feature, featureIdx) => (
                                    <div
                                    key={feature.name}
                                    className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
                                        <div
                                            className={classNames(
                                            featureIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9',
                                            'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4'
                                            )}>
                                                <h3 className="text-2xl font-bold ">{feature.name}</h3>
                                                <p className="mt-2 text-lg ">{feature.description}</p>                                    
                                                <div className="mt-4">{feature.cta}</div>
                                        </div>
                                        <div
                                            className={classNames(
                                            featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-8' : 'lg:col-start-1',
                                            'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
                                            )}
                                        >
                                            <img  src={feature.imageSrc} alt={feature.imageAlt} className="max-h-96" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>



                    <div className="py-24 sm:py-32 bg-green-200 dark:bg-red-800">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <div>
                                Our Products
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Explore the Akello platform
                            </h2>
                            <p className="mt-6 text-lg leading-8 ">                                
                            </p>
                            </div>
                            <div className="mt-16 ">
                                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                                    {features2.map((feature) => (
                                        <div key={feature.name} className="flex flex-col">
                                            <div className='my-auto text-xl font-semibold'>
                                                {feature.name}
                                            </div>                                        
                                            <p className="flex-auto">{feature.description}</p>
                                            <p className="mt-6">
                                                <a href={feature.href} className="text-sm font-semibold leading-6 text-black dark:text-white">
                                                Learn more <span aria-hidden="true">→</span>
                                                </a>
                                            </p>                                                                                        
                                        </div>
                                    ))}
                                </dl>
                        </div>
                    </div>
                    </div> 


               <div className="bg-black">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to dive in?
                    <br />
                        Start for free today
                    </h2>
                    <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                    <a
                        href="https://app.akello.io/signup"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Get started
                    </a>
                    <a href="https://calendly.com/akello-health/30-min-call" className="text-sm font-semibold leading-6 text-white">
                        Book a demo <span aria-hidden="true">→</span>
                    </a>
                    </div>
                </div>
                </div>          


                
               
            </main>
        </div>
    )
}
