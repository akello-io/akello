import React from "react";

const people = [
    { name: 'Not Seen or Threshold Not Met' },
    { name: 'NEW! 30 min ANY month (G2214)' },
    { name: '70 Initial Month Minutes (99492 )'},
    { name: '100 Initial Minutes (99492 + 99494)'},
    { name: '130 Initial Minutes (99492 + 99494 x 2)'},
    { name: '60 Subsequent Month Minutes (99493 )'},
    { name: '90 Subsequent Minutes (99493 + 99494)'},
    { name: '120 Subsequent Minutes (99493 + 99494 x 2)'},
]

export const MonthlyPayerRate = () =>  {
    return (
        <div className="p-4 rounded-md bg-white sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Monthly Billing Rate</h1>
                    <p className="mt-2 text-sm text-gray-700">

                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Avg. Number of Patients
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Total
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {people.map((person) => (
                                <tr key={person!.name}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        {person!.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">1</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$323.22</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


