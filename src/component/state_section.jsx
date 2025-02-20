import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MdError } from "react-icons/md";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .required("Age is required")
    .min(1, "You must be at least 21 years old")
    .max(21, "must be 21"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  course: Yup.string().required("Please select a course"),
});

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      course: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setTimeout(() => {
        console.log(values);
        toast.success("Registration successful!");
        resetForm();
      }, 2000);
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1675198764235-2dc2b37146c9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" bg-opacity-30 backdrop-blur-xl p-8 rounded-lg shadow-lg w-full max-w-md ">
        <h2 className="text-2xl font-bold text-center mb-4 text-white opacity-70 px-4 py-2"
      style={{
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
      }}>
          Student Registration
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {["name", "age", "email"].map((field) => (
            <div key={field} className="mb-4 relative">
              <label
                className={`absolute left-2 top-2 text-white transition-all duration-300 ease-in-out  ${
                  formik.values[field] || document.activeElement.name === field
                    ? "relative text-xl -top-3"
                    : "text-base top-2"
                }`}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="flex items-center justify-center">
                <input
                  type={field === "age" ? "number" : "text"}
                  name={field}
                  className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent transition-all duration-300 ease-in-out"
                  {...formik.getFieldProps(field)}
                  min = {field === "age" ? 0 : null}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <p className="text-red-500 text-sm">
                    <MdError />
                  </p>
                )}
              </div>
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-red-500 text-sm">{formik.errors[field]}</p>
              )}
            </div>
          ))}

          <div className="mb-4 relative">
            <label
              className={`  left-2 top-2 text-white transition-all duration-300 ease-in-out ${
                formik.values.course || document.activeElement.name === "course"
                  ? "block relative text-xl -top-3"
                  : "block text-base top-2"
              }`}>
              Course
            </label>
            <select
              name="course"
              className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent transition-all duration-300 ease-in-out"
              {...formik.getFieldProps("course")}>
              <option value="">Select a course</option>
              <option value="Engineering">Engineering</option>
              <option value="Medicine">Medicine</option>
              <option value="Arts">Arts</option>
            </select>
            {formik.touched.course && formik.errors.course && (
              <p className="text-red-500 text-sm">{formik.errors.course}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FD7968] text-white p-2 rounded hover:bg-[#a76a6295] transition-all duration-300 ease-in-out">
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
