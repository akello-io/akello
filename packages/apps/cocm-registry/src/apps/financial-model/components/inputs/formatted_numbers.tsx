import {NumericFormat} from "react-number-format";

interface InputProps {
    value: number
    setValue: (value: number) => void
}

export const PercentInput:React.FC<InputProps> = ({value, setValue}) => {
    return (
        <NumericFormat
            className="block w-full rounded-md  py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            suffix={"%"}
            isAllowed={(values) => {
                const {floatValue} = values;
                return floatValue! >= 0 &&  floatValue! <= 100;
            }}
            value={value * 100}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setValue(parseFloat(e.currentTarget.value) / 100)
            }}
        />
    )
}

export const IntegerInput:React.FC<InputProps> = ({value, setValue}) => {
    return (
        <NumericFormat
            className="block w-full rounded-md  py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={value}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setValue(parseInt(e.currentTarget.value))
            }}
        />
    )
}

export const DollarInput:React.FC<InputProps> = ({value, setValue}) => {
    return (
        <>
            <NumericFormat
                className="block w-full rounded-md  py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                prefix={"$"}
                thousandSeparator={","}
                value={value}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setValue(parseFloat(e.currentTarget.value.replace(/\D/g,'')))
                }}
            />
        </>
    )
}