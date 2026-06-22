import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

function VerifyEmail() {
  const { verifyToken } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/api/auth/verify-email/${verifyToken}`);
        navigate("/login");
      } catch (err) {
        alert("Invalid or expired verifucation token");
      }
    };
    verifyEmail();
  }, [verifyToken]);

  return <div className="flex items-center justify-center">
    <div className="flex items-center gap-1">
      <Loader2 size={20} className="animate-spin"/>
      <h2>Verifying email...</h2>
    </div>
  </div>;
}

export default VerifyEmail;