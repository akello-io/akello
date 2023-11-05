import React from 'react';
import './App.css';
import {Button} from '@akello/react'

export default function App() {
  return (
      <div>
          <button
              type="button"
              className="rounded bg-indigo-300 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
              Button text
          </button>
          <Button label={"test"} />
      </div>
  )
}