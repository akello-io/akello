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
import React from 'react'
import ReactGA from "react-ga4";


ReactGA.initialize("G-RW14R2MMT9");


const features = [
    {
      name: 'Streamline Measurements',
      description:
      "With Akello, you will have complete visibility with our real time patient monitoring service. You'll receive immediate notifications when patients deviate from their treatment plan.",
      imageSrc: MeasurementImage,
      imageAlt: '',
      cta: (
        <>
            <div
                onClick={() => window.location.href="/docs/measurements"}
                onKeyDown={() => {}}

                className="cursor-pointer flex my-auto rounded-full w-fit bg-black dark:bg-white px-3.5 py-2 text-sm font-semibold text-white dark:text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
                <div>
                    Start with Measurements
                </div>
                <ChevronRightIcon className="h-5 w-5 my-auto" aria-hidden="true" />
            </div>
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
            <div
                onClick={() => window.location.href="/docs/clinical-models"}
                onKeyDown={() => {}}
                className="cursor-pointer flex my-auto rounded-full w-fit bg-black dark:bg-white px-3.5 py-2 text-sm font-semibold text-white dark:text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
                <div>
                    Start with Clinical Models
                </div>
                <ChevronRightIcon className="h-5 w-5 my-auto" aria-hidden="true" />
            </div>
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
                <div
                    onClick={() => window.location.href="/docs/team-based-care"}
                    onKeyDown={() => {}}
                    className="cursor-pointer flex my-auto rounded-full w-fit bg-black dark:bg-white px-3.5 py-2 text-sm font-semibold text-white dark:text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                    <div>
                     Start with Team Collaboration
                    </div>
                    <ChevronRightIcon className="h-5 w-5 my-auto" aria-hidden="true" />
                </div>
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
      name: 'Team-Based',
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
                <div
                className="
                    w-full
                    h-full
                    bg-gradient-to-r
                    from-ak-blue-500
                    via-ak-red-700
                    to-yellow-500
                    background-animate
                "
                >
                    {/* Hero section */}
                    <div className="relative isolate overflow-hidden">
                        <div className="mx-auto px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-24 lg:pt-40">
                            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">


                                <div className="mt-24 sm:mt-32 lg:mt-16 ">
                                    <div
                                        className="no-underline cursor-pointer flex flex-row p-2 text-sm mt-24 sm:mt-32 lg:mt-16 space-x-6 bg-black  bg-opacity-20 text-opacity-80 rounded-full w-fit px-4 text-white"
                                        onClick={() => {
                                                window.location.href="https://github.com/akello-io/akello/releases/tag/v0.0.10"
                                            }}
                                        onKeyDown={() => {}}
                                            >

                                        <div className='flex flex-row my-auto space-x-2'>
                                            <div className='my-auto rounded-full h-3 w-3 bg-green-400'></div>
                                            <div className='font-bold'>
                                                Latest updates
                                            </div>
                                        </div>

                                        <div className='flex flex-row'>
                                            <div>Just shipped v0.0.10</div>
                                            <ChevronRightIcon className="h-5 w-5 my-auto" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>

                                <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl text-white">
                                    Measurement based care infrastructure for absolutely everyone
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-white">
                                    A complete platform for integrated clinical teams to run measurement based care models and receive reimbursements. Get started with Akello now.
                                </p>
                                <div className="mt-10 flex items-center gap-x-6">
                                    <button
                                        id='start-now-button'
                                        onClick={() => {
                                            window.location.href = "https://app.akello.io/signup"
                                            // Send a custom event
                                            ReactGA.event({
                                                category: "cta",
                                                action: "signup",
                                                label: "Signup Hero", // optional                                                ge
                                            });
                                        }}
                                        onKeyDown={() => {}}
                                        className="flex my-auto rounded-full cursor-pointer bg-white px-3.5 py-2 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                    >
                                        <div>
                                            Start now
                                        </div>
                                        <ChevronRightIcon className="h-5 w-5 my-auto" aria-hidden="true" />
                                    </button>
                                    <div
                                        onClick={() => {
                                            window.location.href = "https://calendly.com/akello-health/30-min-call"
                                        }}
                                        onKeyDown={() => {}}
                                        className='flex my-auto font-semibold text-white bg-none cursor-pointer'>
                                        <div>
                                            Contact sales
                                        </div>
                                        <ChevronRightIcon className="h-5 w-5 my-auto" aria-hidden="true" />
                                    </div>


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
                </div>




                <div className="bg-black dark:bg-ak-blue-800 py-4  ">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div
                            onKeyDown={() => {}}
                            onClick={() => {
                                window.location.href = 'https://calendly.com/akello-health/30-min-call'

                            }}
                            className='cursor-pointer flex flex-row w-fit my-auto mx-auto text-white'>
                            <h2 className="text-center my-auto text-xl sm:text-2xl font-semibold leading-8 ">
                                Book a demo
                            </h2>
                            <ChevronRightIcon className="h-5  my-auto w-auto" aria-hidden="true" />
                        </div>
                    </div>
                    </div>



                    <div className="bg-white dark:bg-slate-900">
                        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                            <p className="mt-4 ">
                                How does Akello work?
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">Akello helps your team run and scale models</h2>
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



                    <div className="py-24 sm:py-32 bg-ak-blue-600 dark:bg-ak-blue-900 text-white">
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
                                                <div
                                                    onClick={() => window.location.href = feature.href}
                                                    onKeyDown={() => {}}
                                                    className="cursor-pointer flex my-auto rounded-full w-fit  bg-white px-3.5 py-2 text-sm font-semibold text-black  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                                >
                                                    <div>
                                                        Explore
                                                    </div>
                                                    <ChevronRightIcon className="h-5 w-5 my-auto" aria-hidden="true" />
                                                </div>
                                            </p>
                                        </div>
                                    ))}
                                </dl>
                        </div>
                    </div>
                    </div>


               <div className="bg-black dark:bg-red-500">
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to dive in?
                    <br />
                        Start a free evaluation today
                    </h2>
                    <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                    <div
                        id='start-now-button'
                        onClick={() => window.location.href = "https://app.akello.io/signup"}
                        onKeyDown={() => {}}
                        className="cursor-pointer flex my-auto rounded-full w-fit  bg-white px-3.5 py-2 text-sm font-semibold text-black  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                    >
                        <div>
                            Start now
                        </div>
                        <ChevronRightIcon className="h-5 w-5 my-auto" aria-hidden="true" />
                    </div>
                    <div
                        onClick={() => window.location.href = "https://calendly.com/akello-health/30-min-call"} className='cursor-pointer flex my-auto font-semibold text-white'
                        onKeyDown={() => {}}
                    >
                        <div>
                            Book a demo
                        </div>
                        <ChevronRightIcon className="h-5 w-5 my-auto" aria-hidden="true" />
                    </div>
                    </div>
                </div>
                </div>

                {/* Content section */}
                <div className="my-32 overflow-hidden sm:mt-40">
                        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                                <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">Akello is community driven</h2>
                                <p className="mt-6 text-xl leading-8 ">
                                We are a community of clinicians, engineers and designers who are passionate about improving healthcare. We are committed to building a platform that is easy to use and helps you deliver the best care to your patients.
                                </p>
                                <div
                                    onClick={() => window.location.href = "https://discord.gg/WSqNrWBKKw"}
                                    onKeyDown={() => {}}
                                    className="cursor-pointer flex my-auto rounded-full w-fit bg-black dark:bg-white px-3.5 py-2 text-sm font-semibold text-white dark:text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                                >
                                    <div className='mx-auto text-lg'>
                                        Join our Community
                                    </div>

                                </div>

                            </div>
                            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                                <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                                <img
                                    src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80"
                                    alt=""
                                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                />
                                </div>
                                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                                    <img
                                    src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                                    alt=""
                                    className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                    />
                                </div>
                                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                    <img
                                    src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80"
                                    alt=""
                                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                    />
                                </div>
                                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                    <img
                                    src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                                    alt=""
                                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                    />
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>




            </main>
        </div>
    )
}
