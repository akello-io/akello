import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function LandingPage() {
    return (
        <div className="relative isolate overflow-hidden bg-base-100">
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        <a href="https://github.com/akello-io/akello/releases" className="inline-flex space-x-6">
                          <span className="rounded-full bg-info/10 px-3 py-1 text-sm font-semibold leading-6 text-base-content ring-1 ring-inset ring-info-600/10">
                            What's new
                          </span>
                            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-base-content">
                            <span>Just shipped v1.0</span>
                            <ChevronRightIcon className="h-5 w-5 text-base-content" aria-hidden="true" />
                          </span>
                        </a>
                    </div>
                    <h1 className="mt-10 text-8xl font-light tracking-tight text-base-content sm:text-6xl">
                        Integrated Care
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-base-content/80">
                        Akello is the open source healthcare developer platform for integrated care that helps you build, test, and deliver any healthcare product or service.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <a
                            href="src/containers/pages/LandingPage#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Get started
                        </a>
                        <a href="src/containers/pages/LandingPage#" className="text-sm font-semibold leading-6 text-gray-900">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <img
                                src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                                alt="App screenshot"
                                width={2432}
                                height={1442}
                                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
