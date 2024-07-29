import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaTwitterSquare, FaInstagramSquare, FaYoutube, FaLinkedin } from 'react-icons/fa';
import logo from '../Components/image/logo.jpeg'
const Footer = () => {

    const { isAuthenticated } = useSelector(state => state.user)



    return (
        <footer>
            <div>
                <img src={logo} style={{ width: "60px", height: "45px" }} alt="logo" />
            </div>
            <div>
                <h4>Sppport</h4>
                <ul>
                    <li> Amreli, Gujarat</li>
                    <li>kartik02@gmail.com</li>
                    <li>+91 7043468230</li>
                </ul>
            </div>
            <div>
                <h4>Quick Links</h4>
                <ul>
                    <li to={"/"}>
                        <Link>Home</Link>
                    </li>
                    <li to={"/jobs"}>
                        <Link>Jobs</Link>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <Link to={"/dashboard"}>Dashboard</Link>
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <h4>Follow Us</h4>
                <ul>
                    <li>
                        <Link to={"/"}>
                            <span>
                                <FaTwitterSquare />
                            </span>
                            <span>Twitter (X)</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <span>
                                <FaInstagramSquare />
                            </span>
                            <span>Instagram</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <span>
                                <FaYoutube />
                            </span>
                            <span>Youtube</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <span>
                                <FaLinkedin />
                            </span>
                            <span>LinkedIn</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="copyright">
                &copy; CopyRight 2024. All Rights Reserved.
            </div>
        </footer>
    )
}

export default Footer
