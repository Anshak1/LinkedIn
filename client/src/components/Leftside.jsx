export function Leftside() {
  return (
    <div className="w-[45%]">
      <h1 className="text-[56px] font-light leading-tight text-[#526A6E]">
        Welcome to your professional network
      </h1>

      <div className="mt-8 flex flex-col gap-4">
        <button className="cursor-pointer w-full h-14 border border-gray-400 rounded-full flex items-center justify-center gap-3 hover:bg-gray-100">
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-6 h-6"
            />
            Continue with Google
        </button>

        <button className="cursor-pointer h-14 rounded-full border border-gray-500 text-gray-700 font-semibold hover:bg-gray-100">
          Sign in with email
        </button>
      </div>

      <p className="mt-6 text-xs text-gray-600 text-center">
        By clicking Continue to join or sign in, you agree to LinkedIn's
        User Agreement, Privacy Policy, and Cookie Policy.
      </p>

      <p className="mt-10 text-center text-xl">
        New to LinkedIn?{" "}
        <span className="text-[#0A66C2] font-semibold cursor-pointer">
          Join now
        </span>
      </p>
    </div>
  );
}