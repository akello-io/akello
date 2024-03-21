import {
    ArrowPathIcon,
    ChevronRightIcon,
    CloudArrowUpIcon,
    Cog6ToothIcon,
    FingerPrintIcon,
    LockClosedIcon,
    ServerIcon,
} from '@heroicons/react/20/solid'
import { BoltIcon, CalendarDaysIcon, UsersIcon } from '@heroicons/react/24/outline'
import HeroImg  from './hero.png'
import { CopyBlock } from 'react-code-blocks';



export default function Example() {
    return (
        <div className="">
            <main>
                {/* Hero section */}
                <div className="relative isolate overflow-hidden">
                    <div className="mx-auto px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-24 lg:pt-40">
                        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">

                            <div className="mt-24 sm:mt-32 lg:mt-16">
                                <a href="https://github.com/akello-io/akello/releases/tag/v0.0.8" className="inline-flex hover:no-underline space-x-6">
                                    <span className="rounded-full px-3 py-1 text-sm font-semibold leading-6  ring-1 ring-inset ">
                                      Latest updates
                                    </span>
                                    <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6">
                                    <span>Just shipped v0.0.8</span>
                                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                </a>
                            </div>
                            <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
                                Integrated Mental Health Infrastructure
                            </h1>
                            <p className="mt-6 text-lg leading-8">
                                An open source measurement based platform to run integrated care models for mental health.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <a
                                    href="/docs/intro"
                                    className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                >
                                    Get started
                                </a>
                                <a
                                    href="/docs/intro"
                                    className="rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
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
               
            </main>
        </div>
    )
}
