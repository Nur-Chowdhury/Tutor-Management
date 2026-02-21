import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import logo from "../../assets/logooo.png";

export default function Navbar() {
  const [registrationDropdown, setRegistrationDropdown] = useState(false);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="bg-gray-200 dark:bg-gray-900 shadow-md py-2">
            <nav className="container mx-auto flex items-center justify-between px-6">
                <a href="#home">
                    <img src={logo} alt="Logo" className=" h-20 w-20" />
                </a>

                <ul className="flex space-x-6">
                    <li>
                        <a href="#home">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#faq" onClick={(e) => handleSmoothScroll(e, "#faq")}>
                            FAQ
                        </a>
                    </li>
                    <li>
                        <a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")}>
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")}>
                            Contact
                        </a>
                    </li>
                </ul>
                <div className=" flex justify-between gap-4">
                    <div className=" flex gap-2">
                        <div className="relative">
                            <Link to={'/login'}>
                                <button className="bg-blue-500 px-4 py-2 rounded hover:bg-white hover:border-2 hover:border-blue-500 hover:text-blue-700 hover:font-medium">
                                    Login
                                </button>
                            </Link>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => {
                                    setRegistrationDropdown(!registrationDropdown)
                                }}
                                className="bg-green-500 px-4 py-2 rounded hover:bg-white hover:border-2 hover:border-green-500 hover:text-green-700 hover:font-medium"
                            >
                                Registration
                            </button>
                            {registrationDropdown && (
                                <div className="absolute flex flex-col gap-2 right-0 mt-2 p-2 bg-white text-black rounded shadow-md">
                                    <Link to="/register/tutor" className=" hover:text-blue-700 text-md hover:font-medium">
                                        Tutor
                                    </Link>
                                    <Link to="/register/guardian" className=" hover:text-blue-700 text-md hover:font-medium">
                                        Guardian
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
  );
}
