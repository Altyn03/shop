import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);

    return null;
};

export default LogOut;
