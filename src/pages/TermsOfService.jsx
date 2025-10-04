import React from "react";

export default function TermsOfService() {
  return (
    <div className="container my-5">
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <h1 className="h3 mb-2">Terms of Service</h1>
        <p className="text-muted mb-4">Effective Date: October 4, 2025</p>

        <p className="mb-4">
          Welcome to <strong>93Cars</strong>. By using our website (
          <a
            href="https://93cars.com"
            className="link-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://93cars.com
          </a>
          ) and services, you agree to be bound by the following Terms of
          Service. Please read them carefully before using our platform.
        </p>

        <div className="mb-4">
          <h2 className="h5">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you confirm that you are at least
            18 years old and have the legal capacity to enter into these terms.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="h5">2. Use of Our Services</h2>
          <ul className="ms-4 list-disc">
            <li>You agree to use the website for lawful purposes only.</li>
            <li>You must not attempt to access restricted areas, disrupt operations, or misuse any content.</li>
            <li>Information on this site is provided for general information; we are not responsible for errors, omissions, or delays in content.</li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="h5">3. Accounts & Login</h2>
          <p>
            If you register or log in via third-party services (e.g., Facebook or
            Google), you agree to provide accurate information and keep it up to
            date. You are responsible for maintaining the confidentiality of your
            login credentials.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="h5">4. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and
            software, is the property of Cars93 Info Tech Pvt Ltd and protected
            under applicable laws. Unauthorized use is prohibited.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="h5">5. Limitation of Liability</h2>
          <p>
            We strive to keep our services accurate and available, but we do not
            guarantee uninterrupted or error-free operation. We are not liable for
            any damages arising from the use of our services.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="h5">6. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the content or policies of those sites.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="h5">7. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Any changes
            will be posted on this page with the updated effective date.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="h5">8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the
            laws of India. Any disputes shall be subject to the jurisdiction of
            courts in Bengaluru, Karnataka.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="h5">9. Contact Us</h2>
          <p>For any questions regarding these Terms, please contact us at:</p>
          <p className="mt-2">
            <strong>Cars93 Info Tech Pvt Ltd</strong>
            <br />
            Email: <a
              href="mailto:cars93infotech@gmail.com"
              className="link-primary"
            >
              cars93infotech@gmail.com
            </a>
            <br />
            Website: <a
              href="https://93cars.com"
              className="link-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://93cars.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}