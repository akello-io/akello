import React, {Fragment, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import classNames from "classnames";

type DropdownOption = {
    id: string
    value: string
}

interface DropdownProps {
    placeholder: string
    options: DropdownOption[]
    setSelectedOption: (value: string) => void
}

const Dropdown:React.FC<DropdownProps> = ({placeholder, options, setSelectedOption}) => {

    const [value, setValue] = useState(placeholder)

    return (
        <Menu as="div" className="relative inline-block text-left w-64">
            <div>
                <Menu.Button className="inline-flex w-full py-4 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {value}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {
                            options.map((option) => {
                                return (
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm w-full'
                                                )}
                                                onClick={() => {
                                                    setValue(option.value)
                                                    setSelectedOption(option.value)
                                                }}
                                            >
                                                { option.value }
                                            </button>
                                        )}
                                    </Menu.Item>
                                )
                            })
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}


export default Dropdown