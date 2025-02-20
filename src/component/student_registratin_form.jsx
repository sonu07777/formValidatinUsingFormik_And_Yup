import { useFormik } from "formik";
import * as Yup from "yup";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Only letters are allowed")
    .required("Full Name is required"),
  age: Yup.number()
    .required("Age is required")
    .min(1, "You must be at least 21 years old")
    .max(21, "must be 21"),
  gender: Yup.string().required("Gender is required"),
  nationality: Yup.string().required("Nationality is required"),
  contactInfo: Yup.string().required("Contact Information is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  parentName: Yup.string().required("Parent/Guardian Name is required"),
  relationship: Yup.string().required("Relationship to Student is required"),
  parentContact: Yup.string().required("Parent Contact is required"),
  emergencyContact: Yup.string().required("Emergency Contact is required"),
  schoolName: Yup.string().required("School/Institution Name is required"),
  graduationDate: Yup.date().required("Graduation Date is required"),
  termsAgreed: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
  course: Yup.string().required("Please select a course"),
  file: Yup.mixed()
    .required("File is required")
    .test("fileType", "Only JPEG images are allowed", (value) =>
      value ? value.type === "image/jpeg" : false
    )
    .test("fileSize", "File size must be less than 2MB", (value) =>
      value ? value.size <= 2 * 1024 * 1024 : false
    ),
});
// interestReason: Yup.string().required("Reason for interest is required"),
const StudentRegistrationForm = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      formik.setFieldValue("file", file);

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      file: null,
      fullName: "",
      dob: "",
      gender: "",
      nationality: "",
      contactInfo: "",
      email: "",
      course: "",
      parentName: "",
      relationship: "",
      parentContact: "",
      emergencyContact: "",
      schoolName: "",
      graduationDate: "",
      heardAboutUs: "",
      interestReason: "",
      termsAgreed: false,
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      setTimeout(() => {
        // console.log(values);
        console.log("Form Data Submitted:", values);
        toast.success("Registration successful!");
        resetForm();
      }, 2000);
    },
  });

  return (
    <div
      className="overflow-hidden bg-no-repeat w-full h-auto"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255, 110, 127, 0.6), rgba(191, 233, 255, 0.6))",
      }}>
      {/* <div className="max-w-4xl mx-auto p-6 bg-yellow-50 shadow-md rounded-lg "> */}
      <div
        className="max-w-4xl mx-auto p-6 rounded-lg border"
        style={{
          backgroundColor: "rgba(255, 255, 240, 0.4)", // More transparent yellow
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // subtle shadow
          backdropFilter: "blur(10px)", // Increased blur for a stronger effect
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle white border for contrast
        }}>
        <h2 className="text-2xl font-bold text-center mb-4 outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-orange-600 ">
          Student Registration Form
        </h2>
        <div className="flex items-center justify-between">
          <div className="border border-gray-300 shadow-lg p-6 rounded-xl  max-w-md ">
            <p className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">
              <span className="text-blue-600">College:</span> Gandhi Institute
              For Technology, Bhubaneswar
            </p>
            <p className="font-bold text-lg text-gray-800 border-b pb-2 mb-2">
              <span className="text-green-600">Form No:</span> 20/2000
            </p>
            <p className="font-bold text-lg text-gray-800 flex items-center">
              <span className="text-red-600">Date:</span>
              <span className="ml-3 w-40 h-12 border-dashed border-2 border-gray-400 flex items-center justify-center text-gray-500 italic">
                {formattedDate}
              </span>
            </p>
          </div>

          <div className="w-[3.5cm] h-[4.5cm] border-2 border-dashed border-gray-300 relative flex items-center justify-center overflow-hidden">
            <input
              type="file"
              id="fileInput"
              accept="image/jpeg"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            {preview ? (
              <img
                src={preview}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <label
                htmlFor="fileInput"
                className="absolute text-gray-500 text-sm cursor-pointer">
                Upload Image
              </label>
            )}
            {/* Validation Error Message */}
            {formik.errors.file &&
              formik.touched.file &&(
                <p className="text-red-500  flex items-center gap-2">
                <MdError /> {formik.errors.file}
              </p>
              )}
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-3">
          {/* Student Information */}
          <section className="border-t border-orange-400 pt-4">
            <h3 className="text-lg font-semibold bg-orange-400 p-2 text-white">
              Student Information
            </h3>
            <label className="block mt-5">
              <div className="flex items-start gap-1">
                Full Name <FaStarOfLife className="text-[6px] text-red-900" />
              </div>

              <input
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                className="w-full p-2 border rounded mb-4  outline-none "
              />
            </label>
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500  flex items-center gap-2">
                <MdError /> {formik.errors.fullName}
              </p>
            )}
            {formik.touched.fullName &&
              !formik.errors.fullName &&
              formik.values.fullName && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
            <label className="block">
              <div className="flex items-start gap-1">
                Age <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="age"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                className="w-full p-2 border rounded mb-4  outline-none "
                min={0}
              />
            </label>
            {formik.touched.age && formik.errors.age && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.age}
              </p>
            )}
            {formik.touched.age && !formik.errors.age && formik.values.age && (
              <p className="text-green-500  flex items-center gap-2">
                <FaCheckCircle /> {"success"}
              </p>
            )}
            <div className="mb-4">
              <span>Gender: </span>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />{" "}
                Male
              </label>
              <label className="ml-4">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />{" "}
                Female
              </label>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.gender}
              </p>
            )}
            {formik.touched.gender &&
              !formik.errors.gender &&
              formik.values.gender && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
            <label className="block">
              <div className="flex items-start gap-1">
                Nationality <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="nationality"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nationality}
                className="w-full p-2 border rounded mb-4  outline-none"
              />
            </label>
            {formik.touched.nationality && formik.errors.nationality && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.nationality}
              </p>
            )}
            {formik.touched.nationality &&
              !formik.errors.nationality &&
              formik.values.nationality && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
            <label className="block">
              <div className="flex items-start gap-1">
                Contact Information
                <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="contactInfo"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactInfo}
                className="w-full p-2 border rounded mb-4  outline-none"
              />
            </label>
            {formik.touched.contactInfo && formik.errors.contactInfo && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.contactInfo}
              </p>
            )}
            {formik.touched.contactInfo &&
              !formik.errors.contactInfo &&
              formik.values.contactInfo && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}

            <label className="block">
              <div className="flex items-start gap-1">
                Email
                <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded mb-4  outline-none"
              />
            </label>
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.email}
              </p>
            )}
            {formik.touched.email &&
              !formik.errors.email &&
              formik.values.email && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}

            <label className="block">
              {" "}
              <div className="flex items-start gap-1">
                Course <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
            </label>
            <select
              name="course"
              className="w-full p-2 border rounded mb-4  outline-none"
              {...formik.getFieldProps("course")}>
              <option value="">Select a course</option>
              <option value="Engineering">Engineering</option>
              <option value="Medicine">Medicine</option>
              <option value="Arts">Arts</option>
            </select>
            {formik.errors.course && formik.touched.course && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.course}
              </p>
            )}
            {formik.touched.course &&
              !formik.errors.course &&
              formik.values.course && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
          </section>

          {/* Parent/Guardian Information */}
          <section className="border-t border-orange-400 pt-4">
            <h3 className="text-lg font-semibold bg-orange-400 p-2 text-white">
              Parent/Guardian Information
            </h3>
            <label className="block mt-5">
              <div className="flex items-start gap-1">
                Parent/Guardian Name(s){" "}
                <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="parentName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.parentName}
                className="w-full p-2 border rounded mb-4  outline-none"
              />
            </label>
            {formik.touched.parentName && formik.errors.parentName && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.parentName}
              </p>
            )}
            {formik.touched.parentName &&
              !formik.errors.parentName &&
              formik.values.parentName && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
            <label className="block">
              <div className="flex items-start gap-1">
                {" "}
                Relationship to Student
                <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="relationship"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.relationship}
                className="w-full p-2 border rounded mb-4  outline-none"
              />
            </label>
            {formik.touched.relationship && formik.errors.relationship && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.relationship}
              </p>
            )}
            {formik.touched.relationship &&
              !formik.errors.relationship &&
              formik.values.relationship && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
            <label className="block">
              <div className="flex items-start gap-1">
                Contact Information (Phone, Email){" "}
                <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="parentContact"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.parentContact}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded mb-4  outline-none"
              />
            </label>
            {formik.errors.parentContact && formik.touched.parentContact && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.parentContact}
              </p>
            )}
            {formik.touched.parentContact &&
              !formik.errors.parentContact &&
              formik.values.parentContact && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
            <label className="block">
              <div className="flex items-start gap-1">
                {" "}
                Emergency Contact Information
                <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="emergencyContact"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.emergencyContact}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded mb-4  outline-none"
              />
            </label>
            {formik.errors.emergencyContact &&
              formik.touched.emergencyContact && (
                <p className="text-red-500 flex items-center gap-2">
                  <MdError />
                  {formik.errors.emergencyContact}
                </p>
              )}

            {formik.touched.emergencyContact &&
              !formik.errors.emergencyContact &&
              formik.values.emergencyContact && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
          </section>

          {/* Education Information */}
          <section className="border-t border-orange-400 pt-4">
            <h3 className="text-lg font-semibold bg-orange-400 p-2 text-white">
              Education Information
            </h3>
            <label className="block mt-5">
              <div className="flex items-start gap-1">
                School/Institution Name{" "}
                <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="schoolName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.schoolName}
                className="w-full p-2 border rounded mb-4  outline-none"
              />
            </label>
            {formik.touched.schoolName && formik.errors.schoolName && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.schoolName}
              </p>
            )}
            {formik.touched.schoolName &&
              !formik.errors.schoolName &&
              formik.values.schoolName && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}{" "}
            <label className="block">
              <div className="flex items-start gap-1">
                Graduation Date
                <FaStarOfLife className="text-[6px] text-red-900" />
              </div>
              <input
                name="graduationDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.graduationDate}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded mb-4  outline-none"
              />
            </label>
            {formik.errors.graduationDate && formik.touched.graduationDate && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.graduationDate}
              </p>
            )}
            {formik.touched.graduationDate &&
              !formik.errors.graduationDate &&
              formik.values.graduationDate && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
            <label className="block">
              Why are you interested in our program?
              <textarea
                name="interestReason"
                onChange={formik.handleChange}
                value={formik.values.interestReason}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded mb-4  outline-none"></textarea>
            </label>
            {formik.errors.interestReason && formik.touched.interestReason && (
              <p className="text-red-500 flex items-center gap-2">
                <MdError />
                {formik.errors.interestReason}
              </p>
            )}
            {formik.touched.interestReason &&
              !formik.errors.interestReason &&
              formik.values.interestReason && (
                <p className="text-green-500  flex items-center gap-2">
                  <FaCheckCircle /> {"success"}
                </p>
              )}
          </section>
          {/* Terms condition */}
          <label className=" flex items-center">
            <input
              type="checkbox"
              name="termsAgreed"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.termsAgreed}
              className="mr-2"
            />
            I agree to the terms and conditions
          </label>
          {formik.touched.termsAgreed && formik.errors.termsAgreed && (
            <p className="text-red-500">{formik.errors.termsAgreed}</p>
          )}

          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
