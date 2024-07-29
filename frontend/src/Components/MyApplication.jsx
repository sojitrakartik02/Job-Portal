import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearAllApplicationErrors, resetApplicationSlice, deleteApplication, fetchJobSeekerApplications } from '../store/slices/applicationSlice'
import Spinner from '../Components/Spinner'


const MyApplication = () => {


    const { user, isAuthenticated } = useSelector((state) => state.user)
    const { loading, error, applications, message } = useSelector(state => state.applications)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchJobSeekerApplications())

    }, [])


    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearAllApplicationErrors())
        }
        if (message) {
            toast.success(message)
            dispatch(resetApplicationSlice())

            dispatch(fetchJobSeekerApplications())
        }
        // if ((user && user.role === "Employer") || !isAuthenticated) {
        //     navigate('/')
        // }




    }, [dispatch, error, message])

    const handleDeleteApp = (id) => {
        // dispatch(fetchJobSeekerApplications())
        dispatch(deleteApplication(id))
    }


    return (
        <>
            {
                loading ? (<Spinner />) :
                    (
                        applications && applications.length <= 0 ? (
                            <h1 style={
                                { fontSize: "1.4rem", fontWeight: "600" }
                            }>You have not applid for any job</h1>
                        ) : (
                            <div className='account_components'>
                                <h3> My Application For Job</h3>
                                <div className='applications_container'>
                                    {
                                        applications.map((element) => {
                                            return (
                                                <div className='card' key={element._id}>
                                                    <p className='sub-sec'>
                                                        <span>Job Title:</span>{element.jobInfo.jobTitle}
                                                    </p>
                                                    <p className='sub-sec'>
                                                        <span>Name</span>{element.jobSeekerInfo.name}
                                                    </p>
                                                    <p className="sub-sec">
                                                        <span>Email</span> {element.jobSeekerInfo.email}
                                                    </p>
                                                    <p className="sub-sec">
                                                        <span>Phone: </span> {element.jobSeekerInfo.phone}
                                                    </p>
                                                    <p className="sub-sec">
                                                        <span>Address: </span> {element.jobSeekerInfo.address}
                                                    </p>
                                                    <p className="sub-sec">
                                                        <span>Coverletter: </span>
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

export default MyApplication
