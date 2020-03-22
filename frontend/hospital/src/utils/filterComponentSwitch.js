import React from 'react'
import CreatePatient from "../components/filter/createPatient";
import ManageBeds from '../components/filter/manageBeds';

export function SwitchFilterComponent(props) {
  switch (props.comp) {
    case 'patient':
      return <CreatePatient {...props} />
    case 'beds':
      return <ManageBeds {...props} />
    default:
      return <CreatePatient {...props} />
  }
}