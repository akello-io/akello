import TopNavigation from "../../stories/app/Navigation/TopNavigation/TopNavigation";
import AkelloLogWhite from "../../images/logos/akello/akello-white-logo.png";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useNavigate} from "react-router";


const ProfileComponent = () => {
    const userProfile = useSelector((state: RootState) => state.app.userProfile)
    const navigate = useNavigate()
    return (
        <>
            <div>
                <TopNavigation logo={AkelloLogWhite} profile_photo={userProfile.profile_photo} email={userProfile.email} primary_button={
                    (
                        <>

                            <div className={"flex flex-row space-x-4"}>
                                {/*
                                    <button className={"btn btn-neutral text-xs"} >TALK TO SALES</button>
                                */}
                                <button className={"btn text-xs"} onClick={() => navigate('/registry/create')} >CREATE A NEW REGISTRY</button>
                            </div>

                        </>


                    )}
                />

                <div className={"p-24"}>
                    <div className={"grid grid-cols-4 w-full"}>
                        <div className={"text-center w-min col-span-1"}>
                            <div className={"h-52 bg-slate-200 w-52 rounded-full"}></div>
                            <div className={"btn btn-primary btn-sm"}>Edit</div>
                            <div className={"font-semibold text-2xl"}>Vijay Selvaraj</div>
                            <div className={"font-medium text-xl"}>vijay.selvaraj@gmail.com</div>
                            <div className={"font-medium text-xl"}>(540) 466-0396</div>
                        </div>

                        <div className={"col-span-3 bg-green-300"}>
                            test
                            test

                        </div>
                    </div>




                </div>


            </div>
        </>
    )
}

export default ProfileComponent