import CTAImage from '../images/cta-image.png'


const CTA = () => {
    return (
        <>

                <div className="flex static items-center self-auto w-full font-light leading-7 bg-clip-border bg-black text-neutral-900 py-24">
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-8 relative  justify-between py-0 mx-auto leading-7 xl:w-5/6">
                        <div className="flex col-span-5 flex-col items-start text-black opacity-100">
                            <div className="mb-6">
                                <h2 className="my-0 font-sans text-5xl font-semibold tracking-normal text-white">
                                    Get started with Akello for <span className={"italic"}>FREE</span>
                                </h2>
                            </div>
                            <div className="">
                                <div className="font-sans text-lg leading-normal text-white">
                                    No contracts, no credit card needed to sign up.
                                    <br className="" />
                                </div>
                            </div>
                            <a
                                href={"https://app.akello.io"}
                                target="_blank"
                                className="inline-block p-px max-w-full bg-transparent cursor-pointer"
                            >
                                <div
                                    className="flex justify-start items-center space-x-4 py-5  mx-auto font-sans text-base font-normal leading-4 text-white hover:text-white sm:text-lg"
                                >
                                    <div
                                        className="p-px mt-6 text-white hover:transform-none"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(45deg, rgb(133, 255, 189), rgb(250, 251, 128))",
                                            borderRadius: 50,
                                            textDecoration: "none",
                                            transition: "all 0.3s ease 0s"
                                        }}
                                    >
                                        <div
                                            className="flex gap-3 justify-center items-center py-5 px-6 mx-auto font-sans font-normal leading-4 text-center bg-black border-0 cursor-pointer hover:text-white sm:text-lg"
                                            style={{
                                                textDecoration: "none",
                                                transition: "all 0.2s ease 0s",
                                                borderRadius: 50,
                                                letterSpacing: "normal"
                                            }}
                                        >
                                            Get Started

                                            <img
                                                src="https://uploads-ssl.webflow.com/634b9f9236d9ffdc11dc0eb6/63a3b05f90ad16058f92e06c_Arrow.svg"
                                                loading="lazy"
                                                alt=""
                                                className="flex relative justify-center items-center w-3 max-w-full h-3 align-middle border-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div
                            className="overflow-hidden col-span-3 text-black opacity-100"
                        >
                            <img
                                src={CTAImage}
                                loading="lazy"
                                className="inline-block overflow-hidden w-full h-auto align-middle border-0"
                            />
                        </div>
                    </div>
                </div>

        </>
    )
}

export default CTA