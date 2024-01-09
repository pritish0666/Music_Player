"use client";

import React from "react";
import { IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <footer className="footer relative  bottom-0 left-0 right-0 px-2 z-50 flex flex-col justify-center items-center bg-[rgba(27,29,51,0.9)] text-white">
      <p className="mb-2 mt-2 ">All rights reserved &copy; Charu - 2024</p>

      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <IconButton
          className="text-white"
          color="inherit"
          href="https://github.com/pritish0666"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          className="text-white"
          color="inherit"
          href="https://www.linkedin.com/in/pritish-p-patra-25548421a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          className="text-white"
          color="inherit"
          href="https://www.instagram.com/pritish._.29/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </IconButton>
      </nav>
    </footer>
  );
};

export default Footer;
