import logo from '../images/logo.svg'

const Header = () => {
    return (
        <>
            <div className="flex static items-center self-auto w-full font-light leading-7 bg-clip-border bg-black text-neutral-900">
                <div className="px-4 sm:px-24 flex relative flex-row justify-between py-0 mx-auto w-full">
                    <img
                        src={logo}
                        className="inline-block object-contain overflow-visible static pt-0 h-8 my-auto align-middle"
                    />
                    <div
                        className="p-px my-4 text-white hover:transform-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(45deg, rgb(133, 255, 189), rgb(250, 251, 128))",
                            borderRadius: 50,
                            textDecoration: "none",
                            transition: "all 0.3s ease 0s"
                        }}
                    >
                        <a
                            href={"https://app.akello.io"}
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
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header