import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ allowedRole }) {

    const { user, role, loading } = useAuth();

    if (loading){
        return <p>Loading...</p>
    } 

    if (user == null){
        return <Navigate to="/login" replace />;
    }

    if(role !== allowedRole){
        return <Navigate to = "/unauthorized" replace />
    }

    return <Outlet />;

}

export default ProtectedRoute;