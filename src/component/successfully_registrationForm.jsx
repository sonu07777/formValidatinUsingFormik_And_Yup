import { useNavigate } from "react-router-dom";
import Imgss from "../../public/capLogo.svg";
import { IoMdPrint } from "react-icons/io";

const Successfully = ({ submittedData }) => {
  // if (!submittedData) return <p>Error: No data received.</p>;
  console.log("submitted", submittedData);

  return (
    <div className="border-3 shadow-lg mx-10 bg-white p-1 mt-10 rounded-xl">
      <div className="border-1 p-3 rounded-xl">
        <div className="border-b pb-4">
          <section className="flex flex-col justify-center items-center text-center">
            <img src={Imgss} alt="Institute Logo" className="  " />
            <p className="text-lg font-semibold mt-2 text-gray-700">
              Capsitech Institute of Technology
            </p>
          </section>
        </div>

        <section className="mt-6 space-y-2">
          <h1 className="text-xl font-bold text-gray-800 border-b pb-2">
            Student Details
          </h1>
          <p className="text-gray-600">
            <span className="font-medium">Name:</span> {submittedData.fullName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Age:</span> {submittedData.age}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Gender:</span> {submittedData.gender}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Nationality:</span>{" "}
            {submittedData.nationality}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Contact Information:</span>{" "}
            {submittedData.contactInfo}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {submittedData.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Selected Course:</span>{" "}
            {submittedData.course}
          </p>
        </section>

        <button
          onClick={() => window.print()}
          className="mt-6 w-[50px] bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md transition duration-300 flex items-center justify-center text-center">
          <IoMdPrint />
        </button>
      </div>  
    </div>
  );
};

export default Successfully;
