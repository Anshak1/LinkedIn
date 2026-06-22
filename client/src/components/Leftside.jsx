import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";

export function Leftside() {
  const {serverUrl} = useContext(authDataContext)
  const { setUserData, fetchUserData, fetchAllPosts } = useContext(userDataContext)
  const navigate = useNavigate();
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/google`,
        { credential: credentialResponse.credential },
        { withCredentials: true }
      )
      localStorage.setItem("token", res.data.token)
      setUserData(res.data.user)
      await Promise.all([fetchUserData(), fetchAllPosts()])
      navigate('/feed')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full md:w-3/4 lg:w-[60%] px-4 md:px-0">
      <h1 className="text-3xl md:text-4xl lg:text-[56px] leading-tighter">
        Find jobs, connections, insights and more to grow your career
      </h1>

      <div className="mt-8 flex flex-col gap-4">
        <div className="">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log('Login Failed!')}
            text="continue_with"
            width='300' shape="pill" size="large"
            theme="filled_blue"
          />
        </div>

        <button onClick={() => navigate('/login')}
          className="cursor-pointer w-75 h-10 rounded-full border border-gray-500 text-gray-700 font-semibold hover:bg-gray-100">
          Sign in with Email
        </button>
      </div>

      <p className="mt-6 text-xs md:text-sm text-gray-600 text-center md:text-left w-full md:w-3/4">
        By clicking Continue to join or sign in, you agree to LinkedIn's
        <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/')}>
          &nbsp;User Agreement
        </span>
        ,
        <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/')}>
          &nbsp;Privacy Policy
        </span>
        , and
        <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/')}>
          &nbsp;Cookie Policy
        </span>
        .
      </p>

      <p className="mt-10 text-center md:text-left text-xl">
        New to LinkedIn?{" "}
        <span className="text-[#0A66C2] font-semibold cursor-pointer" onClick={() => navigate('/register')}>
          Join Now
        </span>
      </p>
    </div>
  );
} 