import Screenshot from "../images/screenshot.png"

const Hero = () => {
    return (
        <>
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
                <div className="p-4 mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
                    <div className="flex flex-col items-start max-w-3xl text-neutral-900">
                        <h1 className="pt-10 my-0 h-auto font-sans text-5xl font-extrabold tracking-normal text-black lg:text-7xl">
                            The <span className={"italic text-lime-300"}>Complete</span> Platform for Population Health
                        </h1>
                        <div className="overflow-hidden relative mt-8 mb-10">
                            <p className="mb-0 font-sans text-2xl leading-normal xl:leading-normal font-medium">
                                With population health & AI, primary care can now save big, generate more revenue
                                <br className=""/>
                                <br className=""/>
                                ..and for FREE - yes you read that right!
                            </p>
                        </div>
                    </div>
                    <div>
                        <img src={Screenshot} className={" max-w-3xl"}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Hero