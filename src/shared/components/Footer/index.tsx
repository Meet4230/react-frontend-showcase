import type React from "react";
import {
  GITHUB_ACCOUNT,
  LINKEDIN_ACCOUNT,
  TWITTER_ACCOUNT,
} from "../../constants";
import { FooterLink } from "../../Interfaces";

const footerLinks: FooterLink[] = [
  { href: `https://github.com/${GITHUB_ACCOUNT}`, label: "GitHub" },
  { href: `https://linkedin.com/in/${LINKEDIN_ACCOUNT}`, label: "LinkedIn" },
  { href: `https://twitter.com/${TWITTER_ACCOUNT}`, label: "Twitter" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} React Showcase. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            {footerLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-gray-300 hover:text-white transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
