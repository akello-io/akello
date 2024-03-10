import {ModelInputProps} from "./inputs_interface";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const FacilityLocation:React.FC<ModelInputProps> = ({layout, model, setModel}) => {

    const options = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];
    const defaultOption = options[0];


    return (
        <>
            <form className="bg-base-100 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl ">
                <div className="px-4 py-6 sm:p-8">


                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/*
                        <div className="col-span-full">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-base-content">
                                Street address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={model.address_street}
                                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                        model.address_street = e.currentTarget.value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={model.address_city}
                                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                        model.address_city = e.currentTarget.value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        */}

                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-base-content">
                                State
                            </label>
                            <div className="mt-2">
                                <Dropdown options={options} onChange={(e) => {
                                    model.address_state = e.value
                                    setModel(model.copy())
                                }} value={defaultOption} placeholder="Select an state" />
                            </div>
                        </div>

                        {/*
                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-base-content">
                                ZIP
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={model.address_zipcode}
                                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                        model.address_zipcode = e.currentTarget.value
                                        setModel(model.copy())
                                    }}
                                />
                            </div>
                        </div>
                        */}
                    </div>
                </div>
            </form>
        </>
    )
}

export default FacilityLocation