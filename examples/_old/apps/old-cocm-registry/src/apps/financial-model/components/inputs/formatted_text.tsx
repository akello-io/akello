
interface InputProps {
    value: string
    setValue: (value: string) => void
}


export const TextInput:React.FC<InputProps> = ({value, setValue}) => {
    return (
        <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={value}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setValue(e.currentTarget.value)
            }}
        />
    )
}

export const TextAreaInput:React.FC<InputProps> = ({value, setValue}) => {
    return (
        <>
            <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
                value={value}
                onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement>,
                ): void => {
                    setValue(e.currentTarget.value)
                }}
            />
        </>
    )
}