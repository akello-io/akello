import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {useNavigate} from "react-router";
import Dropdown from "../registry/components/Dropdown";
import {createRegistry} from "../../api/registry";
import {setSelectedRegistry} from "../../reducers/appSlice";

interface InvitedUser {
    first_name: string
    last_name: string
    email: string
    role: string
}


const RegistryCreate = () => {
    const [teamMembers, setTeamMembers] = useState<InvitedUser[]>([])
    const [registryName, setRegistryName] = useState<string>()
    const token = useSelector ((state: RootState) => state.app.token)
    const userProfile = useSelector ((state: RootState) => state.app.userProfile)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <>
            <div className={"flex justify-between bg-ak-light-blue w-full px-12 py-4 text-white"}>
                <div className={"text-2xl my-auto"}>
                    Create your new registry and invite members
                </div>
                <div className={"flex flex-row space-x-4"}>
                    <button className={"btn btn-accent"} onClick={() => {
                        console.log('create registry')
                        createRegistry(token, {
                            'name': registryName,
                            'invited-users': teamMembers,
                            'first_name': userProfile.first_name,
                            'last_name': userProfile.last_name,
                            'email': userProfile.email,
                        }, (data) => {
                            dispatch(setSelectedRegistry({
                                id: data['id'],
                                name: data['name']
                            }))

                            navigate('/registry')
                        })
                    }}>
                        Create
                    </button>

                    <button className={"btn"} onClick={() => navigate("/") }>
                        Cancel
                    </button>
                </div>
            </div>
            <div className={"grid grid-cols-1 divide-y "}>
                <div className={"w-full bg-white py-8 px-12"}>
                    <div className={"flex flex-col space-y-6"}>
                        <div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Registry Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="name"
                                        name="name"
                                        id="name"
                                        value={registryName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setRegistryName(e.target.value)
                                        }}
                                        className="block w-full rounded-md  py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Unique name of your registry"
                                    />
                                </div>
                            </div>
                        </div>
                        {teamMembers.length > 0 && (
                            <p className="mt-2 text-xl text-gray-900" id="email-description">
                                Once you create the registry the user will be added automatically and will be able to access it once they login.
                            </p>
                        )}
                        <div className={"grid grid-cols-2 gap-12"}>
                            {
                                teamMembers.map((teamMember, idx) => {
                                    return (
                                        <div className={"col-span-1 bg-base-300 p-4"}>
                                            <div className={"font-semibold text-2xl pb-4"}>
                                                {teamMember.role}
                                            </div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                First Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    name="first_name"
                                                    id="first_name"
                                                    value={teamMember.first_name}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        let teamMembersCopy = [...teamMembers]
                                                        teamMembersCopy[idx]['first_name'] = e.target.value
                                                        setTeamMembers(teamMembersCopy)
                                                    }}
                                                    className="block w-full rounded-md  py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="First name"
                                                    aria-describedby="email-description"
                                                />
                                            </div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    name="last_name"
                                                    id="last_name"
                                                    value={teamMember.last_name}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        let teamMembersCopy = [...teamMembers]
                                                        teamMembersCopy[idx]['last_name'] = e.target.value
                                                        setTeamMembers(teamMembersCopy)
                                                    }}
                                                    className="block w-full rounded-md  py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="you@example.com"
                                                    aria-describedby="email-description"
                                                />
                                            </div>

                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    name="email"
                                                    id="email"
                                                    value={teamMember.email}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        let teamMembersCopy = [...teamMembers]
                                                        teamMembersCopy[idx]['email'] = e.target.value
                                                        setTeamMembers(teamMembersCopy)
                                                    }}
                                                    className="block w-full rounded-md  py-1.5 text-base-content pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="you@example.com"
                                                    aria-describedby="email-description"
                                                />
                                            </div>
                                            <div className="mt-6">
                                                <Dropdown placeholder={"Set registry role"} options={[
                                                    {id: '1', value: 'Care Manager'},
                                                    {id: '2', value: 'Primary Care Physician'},
                                                    {id: '3', value: 'Consulting Psychiatrist'},
                                                    {id: '4', value: 'Clinical Ops'},
                                                    {id: '5', value: 'Finance'},
                                                ]} setSelectedOption={(role) => {
                                                    let teamMembersCopy = [...teamMembers]
                                                    teamMembersCopy[idx]['role'] = role
                                                    setTeamMembers(teamMembersCopy)
                                                }} />
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={"flex flex-col space-y-4 mt-4"}>
                            <button
                                className={'btn btn-secondary'}
                                onClick={() => {
                                    setTeamMembers([...teamMembers, {
                                        first_name: '',
                                        last_name: '',
                                        email: '',
                                        role: ''
                                    }])
                                }}>
                                Invite more members
                            </button>
                        </div>

                    </div>

                </div>
            </div>


        </>
    )
}

export default RegistryCreate