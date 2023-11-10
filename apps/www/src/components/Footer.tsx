import CFHA from "../images/CFHA-Member-Logo-12.png";


const Footer = () => {

    return (
        <>
            <div className="flex static items-center self-auto w-full font-light leading-7 bg-clip-border bg-white text-neutral-900">
                <div className="px-4 sm:px-24 flex relative flex-row justify-between py-0 mx-auto w-full">
                    <img
                        src={CFHA}
                        className="inline-block object-contain overflow-visible static pt-0 h-64 my-auto align-middle"
                    />
                </div>
            </div>
        </>
    )
}


export default Footer