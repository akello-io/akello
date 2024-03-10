

const CoCMExperts = () => {

    return (
        <>
            <div className="flex static items-center self-auto w-full font-light leading-7 bg-clip-border bg-ak-light-blue text-neutral-900 py-24">
                <div className="flex flex-col p-4  relative space-y-4 justify-center py-0 mx-auto leading-7 xl:w-5/6">
                    <div className={"text-center font-sans text-5xl font-extrabold w-full text-white"}>
                        Need help with starting Collaborative Care?
                    </div>
                    <div className={"text-center text-white text-xl max-w-2xl mx-auto"}>
                        We partner with experienced CoCM veterans from Concert Health, Mindoula, AIMS University of Washington for you so we can focus on the tech 💪
                    </div>
                    <a
                        href={"mailto:vijay@akello.io?subject = Akello - CoCM Consult"}

                        target="_blank"
                        className="inline-block p-px max-w-full bg-transparent cursor-pointer mx-auto "
                    >
                        <div
                            className="flex justify-start items-center space-x-4 py-5 px-6 mx-auto font-sans text-base font-normal leading-4 text-white hover:text-white sm:text-lg"
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
                                    className="flex gap-3 justify-center items-center py-5 px-6 mx-auto font-sans font-normal leading-4 bg-ak-light-blue  border-0 cursor-pointer hover:text-white sm:text-lg"
                                    style={{
                                        textDecoration: "none",
                                        transition: "all 0.2s ease 0s",
                                        borderRadius: 50,
                                        letterSpacing: "normal"
                                    }}
                                >
                                    Request a consult

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
            </div>

        </>
    )
}

export default CoCMExperts