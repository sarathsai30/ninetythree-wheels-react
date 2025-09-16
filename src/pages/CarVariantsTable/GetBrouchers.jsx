import React from "react";
import { FaRegFilePdf } from "react-icons/fa";
import brochures from "../../data/brochure.json";

const GetBrouchers = ({ carname }) => {
  const brochure = brochures.find(
    (item) => item.name?.toLowerCase() === carname?.toLowerCase()
  );

  return (
    <div className="flex justify-left mt-5">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between bg-white border rounded-md shadow p-4 w-full max-w-lg gap-3">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <FaRegFilePdf className="text-red-600 text-2xl flex-shrink-0" />
          <span className="font-medium text-gray-800 text-center sm:text-left">
            {carname} 2025 Brochure
          </span>
        </div>

        {/* Right Section */}
        {brochure ? (
          <a
            href={brochure.url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded w-full sm:w-auto text-center"
          >
            Download Brochure
          </a>
        ) : (
          <span className="text-gray-500 text-sm italic">
            Brochure not available
          </span>
        )}
      </div>
    </div>
  );
};

export default GetBrouchers;
