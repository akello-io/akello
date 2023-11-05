import React from 'react';
import './App.css';
import {Button, WelcomeBanner, WelcomeTemplate} from '@akello/react'


const data = {
    first_name: 'Vijay',
}


export default function App() {
  return (
      <div>
          <div className="h-fit min-h-screen bg-blue-800  ">
              <WelcomeTemplate first_name={data.first_name} bannerStyles={"text-white"}>
                  <div>
                      Child
                  </div>
              </WelcomeTemplate>
          </div>
      </div>
  )
}