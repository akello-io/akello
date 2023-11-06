import { TopNavigation, WelcomeTemplate } from '@akello/react'
import { Button } from '@akello/core'

const HomePage = () => {


    return (
        <>
            <TopNavigation
                classNames={'px-24 bg-ak-dark-blue'}
                logo={''}
                createRegistry={() => console.log('create registry clicked')}
                logout={() => {}}
                email={'vijay@g.com'}
                profile_photo={''}
            />
            <div className="h-fit min-h-screen bg-ak-dark-blue">
                <WelcomeTemplate first_name={'Vijay'} bannerStyles={"text-white"}>
                    <Button label={"core"} />
                </WelcomeTemplate>
            </div>
        </>
    )
}

export default HomePage