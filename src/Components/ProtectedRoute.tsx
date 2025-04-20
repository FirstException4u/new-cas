import { ReactNode, useEffect } from 'react';
import { useStudentDashboardStore } from '../GlobalStore/StudentDashboardStore';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
}

export function StudentProtectedRoute({ children }: ProtectedRouteProps) {
    const Email = useStudentDashboardStore()?.userEmail || localStorage.getItem("userEmail");
    const navigate = useNavigate();

    useEffect(() => {
        if (!Email) {
            navigate("/", { replace: true });
        }
    }, [Email, navigate]);

    if (!Email) {
        return null; 
    }

    return (
        <div>
            {children}
        </div>
    );
}


export function AdminProtectedRoute({ children }: ProtectedRouteProps) {
    const Email = useStudentDashboardStore()?.userEmail || localStorage.getItem("userEmail");
    const navigate = useNavigate();

    useEffect(() => {
        if (!Email) {
            navigate("/", { replace: true });
        }
        if(!Email?.includes("@admin.com")){
            navigate("/", { replace: true });
        }
    }, [Email, navigate]);

    if (!Email) {
        return null; 
    }

    return (
        <div>
            {children}
        </div>
    );
}
