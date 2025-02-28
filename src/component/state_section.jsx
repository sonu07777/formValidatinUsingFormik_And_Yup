import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MdError } from "react-icons/md";

const validate = (values) => {
  const errors = {};
  // const navigate = useNavigate();

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.age) {
    errors.age = "Age is required";
  } else if (values.age < 21) {
    errors.age = "You must be at least 21 years old";
  } else if (values.age > 21) {
    errors.age = "Must be 21";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }

  if (!values.course) {
    errors.course = "Please select a course";
  }

  return errors;
};

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      course: "",
    },
    validate,
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
      className="min-h-screen flex flex-col gap-2 items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" bg-opacity-30 backdrop-blur-[70px] p-8 rounded-l-xl  rounded-lg shadow-lg w-full max-w-md ">
        <h2
          className="text-2xl font-bold text-center mb-4 text-white opacity-70 px-4 py-2"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
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
                  min={field === "age" ? 0 : null}
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
              className={`w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent transition-all duration-300 ease-in-out `}
              {...formik.getFieldProps("course")}>
              <option selected disabled value="">
                Select a course
              </option>
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
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-[#2070A1] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
        ← Go Back
      </button>
    </div>
  );
};

export default RegistrationForm;
