import React from 'react';
import './App.css';
import {Button, WelcomeBanner, WelcomeTemplate, RegistrySelectRow, RegistryMemberships, TopNavigation} from '@akello/react'
import AkelloLogoBlue from './assets/logos/akello-corner-logo.svg'
import AppLogo from './assets/logos/logo.svg'

const data = {
    first_name: 'Vijay',
    registry_list: [
        {
            logo: AkelloLogoBlue,
            name: 'Moderate Depression',
            members: 3,
            patients: 143
        },
        {
            logo: AkelloLogoBlue,
            name: 'Moderate Depression',
            members: 3,
            patients: 143
        },
        {
            logo: AkelloLogoBlue,
            name: 'Moderate Depression',
            members: 3,
            patients: 143
        }
    ]
}


export default function App() {
  return (
      <div>

          <TopNavigation
              classNames={'px-24 bg-ak-dark-blue'}
              logo={AppLogo}
              profile_photo={"https://pbs.twimg.com/profile_images/679362003652055040/e3WMaSAs_400x400.jpg"}
          />
          <div className="h-fit min-h-screen bg-ak-dark-blue">
              <WelcomeTemplate first_name={data.first_name} bannerStyles={"text-white"}>
                  <RegistryMemberships>
                      {
                          data.registry_list.map((registry) => {
                              return (
                                  <RegistrySelectRow
                                      logo={registry.logo}
                                      name={registry.name}
                                      members={registry.members}
                                      patients={registry.patients}
                                      onClick={(registry_id) => {
                                          console.log('clicked registry: '  + registry_id)
                                      }}
                                  />
                              )
                          })
                      }
                  </RegistryMemberships>

              </WelcomeTemplate>
          </div>
      </div>
  )
}