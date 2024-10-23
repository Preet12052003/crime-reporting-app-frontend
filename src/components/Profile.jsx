import React, { useEffect , useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Profile = () => {
  const [reports, setReports] = useState([])
  const { state } = useAuth()
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/crimeReports/all' , {
          userId: state.user.id
        })
        setReports(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchReports();
  } , [])
  return (
    <>
      <h1 className='mb-3 text-xl'>Email : {state.user.email}</h1>
      <h3 className='mb-6'>UserID : {state.user.id}</h3>

      <div className='border-t'>
        <h1 className='mt-4 text-xl font-semibold text-gray-700 mb-4'>All Reports</h1>
        <div className='flex flex-col justify-center'>
          {reports.map(rep => (
            <div 
              key={rep._id}
              className='container border p-5 bg-slate-100'
            >
              <div className='flex justify-between items-center'>
                <div className='text-xl mb-2 '>{rep.crimeType.toUpperCase()}</div>
                <div>{rep.dateTime}</div>
              </div>
              <div><span className='font-medium'>Location</span> : {rep.location}</div>
              <div><span className='font-medium'>Description</span> : {rep.description}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Profile