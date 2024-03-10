import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    DocumentChartBarIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
} from '@heroicons/react/24/outline'

const solutions = [
    {   name: 'Collaborative Care',
        description: 'Run integrated care models like CoCM', href: '#',
        icon: ChartPieIcon
    },
    {
        name: 'SBIRT',
        description: "Integrated with EHR's, automatically refer patients to treatment",
        href: '#',
        icon: SquaresPlusIcon,
    },
    {
        name: 'PCBH',
        description: 'Enable your PCBH program',
        href: '#',
        icon: CursorArrowRaysIcon,
    },
    {
        name: 'PC-MHI', description: 'Enable your PC-HMI models', href: '#', icon: ArrowPathIcon
    },
    { name: 'Primary Care Case Management', description: "Enable your PCCM program", href: '#', icon: FingerPrintIcon },
    {
        name: 'MedFT',
        description: 'Enable your MedFT program',
        href: '#',
        icon: DocumentChartBarIcon,
    },
    {
        name: 'PRISM-e',
        description: 'Enable your PRISM-e program',
        href: '#',
        icon: DocumentChartBarIcon,
    },
]


interface TopNavFlyOutMenuButtonProps {
    name: string
}

const SolutionsFlyOutMenuButton:React.FC<TopNavFlyOutMenuButtonProps> = ({name}) => {
    return (
        <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
                <span>{name}</span>
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/4 px-4">
                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                            {solutions.map((item) => (
                                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <a href={item.href} className="font-semibold text-gray-900">
                                            {item.name}
                                            <span className="absolute inset-0" />
                                        </a>
                                        <p className="mt-1 text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/*
                        <div className="bg-gray-50 px-8 py-6">
                            <div className="flex items-center gap-x-3">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Enterprise</h3>
                                <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Empower your entire team with even more advanced tools.
                            </p>
                        </div>
                        */}
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}


export default SolutionsFlyOutMenuButton