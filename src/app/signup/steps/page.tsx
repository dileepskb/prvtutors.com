"use client"
import Autocomplete from "@/components/autocomplete/autocomplete";


export default function Steps(){
    // const [, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     role: "", 
    //   });
    const handleSubmit  =() => {}
    // const handleChange = (e) => {
    //     const { name, value} = e.target
    //     setFormData((prevItem) => ({
    //         ...prevItem,
    //         [name]:value
    //     }))
    // }
    return<>
       <form className="w-full" onSubmit={handleSubmit}>
          
            <div className="mb-4">
              <Autocomplete />
            </div>

            {/* <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}

            {/* Radio Buttons for Role */}
            

            {/* <button
              type="submit"
              className={`w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "SUBMIT"}
            </button> */}
          </form>
    </>
}