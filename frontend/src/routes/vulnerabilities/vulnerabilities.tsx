import PrimarySwitch from "../../components/switch/PrimarySwitch"
import { useState } from "react"

export const Vulnerabilities = () => {
  const [enabledValid, setEnabledValid] = useState(false)
  const [enabledNew, setEnabledNew] = useState(false)
  const [enabledUpdate, setEnabledUpdate] = useState(false)

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-gray-900 shadow-lg rounded-lg p-6 mt-6">
        <div className="flex items-center mb-4">
          <div>
            <select className="border border-gray-300 rounded p-2">
              <option>Español</option>
              <option>English</option>
            </select>
          </div>
          <div className="flex space-x-3">
            <PrimarySwitch enabled={enabledValid} onChange={setEnabledValid}/>
          </div>
          <div> 
            <PrimarySwitch enabled={enabledNew} onChange={setEnabledNew}/>
          </div>
          <div>
            <PrimarySwitch enabled={enabledUpdate} onChange={setEnabledUpdate}/>
          </div>
          <button className="bg-teal-500 text-white rounded px-4 py-2">Merge Vulnerabilities</button>
          <></>
          <div>
            <button className="bg-teal-500 text-white rounded px-4 py-2">New Vulnerability</button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          
          
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Search" className="border border-gray-300 rounded p-2 w-full" />
        </div>
        <div className="mb-4 flex space-x-4">
          <input type="text" placeholder="Category" className="border border-gray-300 rounded p-2 w-full" />
          <input type="text" placeholder="Type" className="border border-gray-300 rounded p-2 w-full" />
        </div>
        <div className="text-center text-gray-500">
          No matching records found
        </div>
      </div>
    </div>
  );

};
