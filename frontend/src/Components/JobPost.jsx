import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { postJob, resetJobSlice, clearAllJobErrors } from '../store/slices/jobSlice';
import { CiCircleInfo } from 'react-icons/ci'

const JobPost = () => {

    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [offers, setOffers] = useState("");
    const [title, setTitle] = useState("");
    const [qualifications, setQualifications] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [jobNiche, setJobNiche] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");
    const [salary, setSalary] = useState("");
    const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
    const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");

    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { loading, error, message } = useSelector((state) => state.jobs);
    const dispatch = useDispatch();



    const handlePostJob = (e) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("jobType", jobType);
        formData.append("location", location);
        formData.append("companyName", companyName);
        formData.append("introduction", introduction);
        formData.append("responsibilities", responsibilities);
        formData.append("qualifications", qualifications);
        offers && formData.append("offers", offers);
        formData.append("jobNiche", jobNiche);
        formData.append("salary", salary);
        hiringMultipleCandidates &&
            formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
        personalWebsiteTitle &&
            formData.append("personalWebsiteTitle", personalWebsiteTitle);
        personalWebsiteUrl &&
            formData.append("personalWebsiteUrl", personalWebsiteUrl);

        dispatch(postJob(formData));
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllJobErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetJobSlice());
        }
    }, [dispatch, error, loading, message]);


    const cities = [
        "Karachi",
        "Lahore",
        "Islamabad",
        "Rawalpindi",
        "Faisalabad",
        "Multan",
        "Hyderabad",
        "Quetta",
        "Peshawar",
        "Sialkot",
        "Gujranwala",
        "Sargodha",
        "Bahawalpur",
        "Sukkur",
        "Mardan",
        "Mingora",
        "Sheikhupura",
        "Mandi Bahauddin",
        "Larkana",
        "Nawabshah",
    ];
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
            <h3>
                Post Job
            </h3>
            <div>
                <label >Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Job Title' />
            </div>
            <div>
                <label >job Type</label>
                <select
                    value={jobType} onChange={(e) => setJobType(e.target.value)}>
                    <option value="">Select Job</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                </select>
            </div>
            <div>
                <label >Location </label>
                <select
                    value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Select Job </option>
                    {
                        cities.map((element) => {
                            return (

                                <option value={element}>{element}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label >Company Name</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='Job Title' />
            </div>

            <div>
                <label >job Introduction</label>
                <textarea name="" value={introduction} placeholder='Job introduction' rows={7} onChange={(e) => setIntroduction(e.target.value)} id=""></textarea>
            </div>
            <div>
                <label>Responsibilities</label>
                <textarea
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    placeholder="Job Responsibilities"
                    rows={7}
                />
            </div>
            <div>
                <label >Qualification</label>
                <textarea name="" value={qualifications} placeholder='requiredQualification for job ' rows={7} onChange={(e) => setQualifications(e.target.value)} id=""></textarea>
            </div>
            <div>
                <div className='label-infoTag-wrapper'><label >What we offer   </label>
                    <span><CiCircleInfo />Optional</span></div>
                <textarea name="" value={offers} placeholder='What offre for job ' rows={7} onChange={(e) => setOffers(e.target.value)} id=""></textarea>
            </div>
            <div>
                <label >Job Niches </label>
                <select
                    value={jobNiche} onChange={(e) => setJobNiche(e.target.value)}>
                    <option value="">Select Job Niches </option>
                    {
                        nichesArray.map((element) => {
                            return (

                                <option value={element}>{element}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label >Salary</label>
                <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder='10000' />
            </div>
            <div>
                <div className='label-infoTag-wrapper'>

                    <label >hiring mutliple candidate  </label>
                    <span><CiCircleInfo />Optional</span>
                </div>
                <select
                    value={hiringMultipleCandidates} onChange={(e) => setHiringMultipleCandidates(e.target.value)}>
                    <option value="">Hiring Multiple candidaye</option>
                    <option value="">yes</option>
                    <option value="">No</option>
                </select>
            </div>
            <div>
                <div className='label-infoTag-wrapper'>

                    <label >Personal Website </label>
                    <span><CiCircleInfo />Optional</span>
                </div>
                <input type='text' placeholder='Personal Website Name' value={personalWebsiteTitle} onChange={(e) => setPersonalWebsiteTitle(e.target.value)} />

            </div>
            <div>
                <div className='label-infoTag-wrapper'>

                    <label >Personal Website url </label>
                    <span><CiCircleInfo />Optional</span>
                </div>
                <input type='text' placeholder='Personal Website Url' value={personalWebsiteUrl} onChange={(e) => setPersonalWebsiteUrl(e.target.value)} />

            </div>
            <div>
                <button
                    style={{ margin: "0 auto" }}
                    className="btn"
                    onClick={handlePostJob}
                    disabled={loading}
                >
                    Post Job
                </button>
            </div>
        </div >
    )
}

export default JobPost
