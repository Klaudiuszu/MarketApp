import Link from "next/link";

/**
 * FooterLink
 *
 * Small helper to render a short footer sentence with an inline link.
 *
 * @param {string} text - The leading text in the footer sentence.
 * @param {string} linkText - The clickable link text.
 * @param {string} href - Destination href for the link.
 * @returns {JSX.Element} Formatted footer paragraph with an inline link.
 */
const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
  return (
    <div className="text-center pt-4">
      <p className="text-sm text-gray-500">
        {text}
        {` `}
        <Link href={href} className="footer-link">
          {linkText}
        </Link>
      </p>
    </div>
  );
};
export default FooterLink;
