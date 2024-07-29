import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearAllUpdateProfileError, updateProfile } from '../store/slices/updateProfileSlice'
import { toast } from 'react-toastify'
import { getUser } from '../store/slices/useSlice'

const UpdateProfile = () => {
    const { user } = useSelector((state) => state.user)
    const { loading, error, isUpdated } = useSelector((state) => state.updateProfile)


    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [address, setAddress] = useState(user && user.address);
    const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
    const [resume, setResume] = useState(null);
    const [phone, setPhone] = useState(user && user.phone);
    const [secondNiche, setSecondNiche] = useState(user && user.niches?.secondNiche);
    const [thirdNiche, setThirdNiche] = useState(user && user.niches?.thirdNiche);
    const [resumePreview, setResumePreview] = useState(user && user.resume?.url);
    const [firstNiche, setFirstNiche] = useState(user && user.niches?.firstNiche);


    const handleUpdateProfile = () => {
        const formData = new FormData();

        formData.append("name", name)
        formData.append("email", email)

        formData.append("phone", phone)

        formData.append("address", address)
        if (user && user.role === "Job Seeker") {
            formData.append("firstNiche", firstNiche);
            formData.append("secondNiche", secondNiche);
            formData.append("thirdNiche", thirdNiche);
            formData.append("coverLetter", coverLetter);
        }
        if (resume) {

            formData.append("resume", resume)
        }


        dispatch(updateProfile(formData))

    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {


        if (error) {
            toast.error(error)
            dispatch(clearAllUpdateProfileError())
        }
        if (isUpdated) {
            toast.success("Profile Upadted")
            dispatch(getUser())
            dispatch(clearAllUpdateProfileError())
            navigate('/')
        }

    }, [loading, error, dispatch, isUpdated, user])

    const resumeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setResumePreview(reader.result)
            setResume(file)
        }
    }

    const nichesArray = [
        "Software Development",
        "Web Development",
        "Cybersecurity",
        "Data Science",
        "Artificial Intelligence",
        "Cloud Computing",
        "DevOps",
        "Mobile App Development",
        "Blockchain",
        "Database Administration",
        "Network Administration",
        "UI/UX Design",
        "Game Development",
        "IoT (Internet of Things)",
        "Big Data",
        "Machine Learning",
        "IT Project Management",
        "IT Support and Helpdesk",
        "Systems Administration",
        "IT Consulting",
    ];




    return (
        <div className='account_components'>
            <h3>Update Profile</h3>
            <div>
                <label htmlFor="">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {
                user && user.role === "Job Seeker" && (
                    <> <div>
                        <label htmlFor="">My Job Niches</label>
                        <div className='' style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <select value={firstNiche} onChange={(e) => setFirstNiche(e.target.value)}>
                                {
                                    nichesArray.map((element, index) => {
                                        return (
                                            <option value={element} key={index}>{element}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={secondNiche} onChange={(e) => setSecondNiche(e.target.value)}>
                                {
                                    nichesArray.map((element, index) => {
                                        return (
                                            <option value={element} key={index}>{element}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={thirdNiche} onChange={(e) => setThirdNiche
                                (e.target.value)}>
                                {
                                    nichesArray.map((element, index) => {
                                        return (
                                            <option value={element} key={index}>{element}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                    </div>
                        <div>
                            <label >CoverLetter</label>
                            <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={5}></textarea>
                        </div>
                        <div>
                            <label htmlFor="">Upload Resume</label>
                            <input type="file" onChange={resumeHandler} />
                            {
                                user && user.resume && (
                                    <div>
                                        <p>Current Resume:</p>
                                        <Link to={user.resume && user.resume.url} target='_blank' className='view-resume'>View Resume</Link>
                                    </div>
                                )
                            }
                        </div>
                    </>
                )
            }
            <div>
                <label >Phone Number </label>
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
                <label >Address </label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className='save_change_btn_wrapper'>
                <button className='btn' onClick={handleUpdateProfile} disabled={loading}>Save Changes</button>
            </div>
        </div>
    )
}

export default UpdateProfile
