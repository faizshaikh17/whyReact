
import React from "react";
import githubLogo from "../../assets/img/github.png";
import { FaGithub } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-background text-[#FAFAFA] dark:bg-dark-bg text-primary relative dark:text-dark-primary px-6 py-4  bottom-0 left-0 w-full">
            <div className=" flex justify-center items-center space-x-2">
                <p className="text-center text-sm">© Designed & Developed by Faiz Shaikh</p>
                <a
                    href="https://github.com/faizshaikh17/whyReact/tree/main/jusBlog"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub className="h-4 w-4" />
                </a>

            </div>
        </footer>
    );
}

export default Footer;
