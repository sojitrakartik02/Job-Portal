import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout, clearAllUserError } from '../store/slices/useSlice'
import { toast } from 'react-toastify'
import UpdatePassword from '../Components/UpdatePassword'
import UpdateProfile from '../Components/UpdateProfile'
import MyApplications from '../Components/MyApplication'
import JobPost from '../Components/JobPost'
import { LuMoveRight } from 'react-icons/lu'
import MyProfile from '../Components/MyProfile'
import MyJobs from '../Components/MyJobs'
import Applications from '../Components/Application'


const Dashboard = () => {
    const [show, setShow] = useState(false)
    const [componentName, setComponentName] = useState("My Profile")

    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logout")
    }


    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearAllUserError())
        }
        if (!isAuthenticated) {
            navigate("/")
        }
    }, [dispatch, loading, error, isAuthenticated])



    return (
        <>
            <section className='account'>
                <div className="component_header">
                    <p>Dashboard</p>
                    <p>Welcome <span>{user && user.name}</span></p>
                </div>
                <div className="container">
                    <div className={show ? "sidebar showSidebar" : "sidebar"}>
                        <ul className='sidebar_links'>
                            <h4>Manag Account</h4>
                            <li><button onClick={() => {
                                setComponentName("My Profile");
                                setShow(!show);
                            }}>My Profile</button></li>
                            <li><button onClick={() => {
                                setComponentName("Update Profile");
                                setShow(!show);
                            }}>Update Profile</button></li>
                            <li><button onClick={() => {
                                setComponentName("Update Password");
                                setShow(!show);
                            }}>Update Password</button></li>

                            {user && user.role === "Employer" && (

                                <li><button onClick={() => {
                                    setComponentName("Job Post");
                                    setShow(!show);
                                }}>Post new Job</button></li>
                            )}
                            {user && user.role === "Employer" && (

                                <li><button onClick={() => {
                                    setComponentName("My Jobs");
                                    setShow(!show);
                                }}>My Job</button></li>
                            )}
                            {user && user.role === "Employer" && (

                                <li><button onClick={() => {
                                    setComponentName("Applications");
                                    setShow(!show);
                                }}>Applocation</button></li>
                            )}
                            {user && user.role === "Job Seeker" && (

                                <li><button onClick={() => {
                                    setComponentName("My Applications");
                                    setShow(!show);
                                }}>My Application</button></li>

                            )}

                            <li> <button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                    <div className="banner">
                        <div className={show ? 'sidebar_icon move_right' : "'sidebar_icon move_left'"} >
                            <LuMoveRight onClick={() => setShow(!show)} className={show ? "left_arrow" : "right_arrow"} />
                        </div>
                        {
                            (() => {
                                switch (componentName) {
                                    case "My Profile":
                                        return <MyProfile />;
                                        break;
                                    case "Update Profile":
                                        return <UpdateProfile />;
                                        break;
                                    case "Update Password":
                                        return <UpdatePassword />;
                                        break;
                                    case "Job Post":
                                        return <JobPost />;
                                        break;
                                    case "My Jobs":
                                        return <MyJobs />;
                                        break;
                                    case "Applications":
                                        return <Applications />;
                                        break;
                                    case "My Applications":
                                        return <MyApplications />;
                                        break;

                                    default:
                                        <MyProfile />;
                                        break;
                                }
                            })()}

                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard
