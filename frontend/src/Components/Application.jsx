import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAllApplicationErrors, deleteApplication, fetchEmployerApplications, resetApplicationSlice } from '../store/slices/applicationSlice'
import Spinner from '../Components/Spinner'
import { Link } from 'react-router-dom'
const Application = () => {

    const { isAuthenticated } = useSelector(state => state.user)
    const { applications, loading, error, message } = useSelector(state => state.applications)

    const dispatch = useDispatch()
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearAllApplicationErrors())
        }
        if (message) {
            toast.success(message)
            dispatch(resetApplicationSlice())
        }
        dispatch(fetchEmployerApplications())
    }, [dispatch, error, message])

    const handleDeleteApp = (id) => {
        dispatch(deleteApplication(id))
    }



    return (
        <>
            {
                loading ? (<Spinner />) : (
                    applications && applications.length <= 0 ? <h1 style={
                        { fontSize: "1.4rem", fontWeight: "600" }}> You Have no Application</h1 > : (
                        <div className='account_components'>
                            <h3>  Application For  Your Posted job</h3>
                            <div className='applications_container'>
                                {
                                    applications.map((element) => {
                                        return (
                                            <div className='card' key={element._id}>
                                                <p className='sub-sec'>
                                                    <span>Job Title:</span>{element.jobInfo.jobTitle}
                                                </p>
                                                <p className='sub-sec'>
                                                    <span>Applicant Name</span>{element.jobSeekerInfo.name}
                                                </p>
                                                <p className="sub-sec">
                                                    <span>Applicant Email</span> {element.jobSeekerInfo.email}
                                                </p>
                                                <p className="sub-sec">
                                                    <span> Applicant Phone: </span> {element.jobSeekerInfo.phone}
                                                </p>
                                                <p className="sub-sec">
                                                    <span>Applicant Address: </span> {element.jobSeekerInfo.address}
                                                </p>
                                                <p className="sub-sec">
                                                    <span>Applicant Coverletter: </span>
                                                    <textarea
                                                        value={element.jobSeekerInfo.coverLetter}
                                                        rows={5}
                                                        disabled
                                                    ></textarea>
                                                </p>
                                                <div className="btn-wrapper">
                                                    <button
                                                        className="outline_btn"
                                                        onClick={() => handleDeleteApp(element._id)}
                                                    >
                                                        Delete Application
                                                    </button>
                                                    <Link
                                                        to={
                                                            element.jobSeekerInfo &&
                                                            element.jobSeekerInfo.resume.url
                                                        }
                                                        className="btn"
                                                        target="_blank"
                                                    >
                                                        View Resume
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    )
                )
            }
        </>
    )
}

export default Application
