import React from 'react'
import Button from './Button'
import EmployeeForm from './EmployeeForm'

function Home() {
  return (
    <div className='home' style={home}>
         <Button innerText={"See Employees"} to={"/employees"}/>
        <EmployeeForm />
    </div>
  )
}
const home={
    backgroundColor: 'black',
  color: 'white',
  padding: '20px',
  minHeight: '100vh', 
}

export default Home