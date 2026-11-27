import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react"
import { getStudent } from "../../services/studentService";


function AcademicRecord() {
    const {  studentId, loading } = useAuth();
    
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    let ignore = false;

    if (!loading && studentId) {

        async function fetchStudent() {
            try {
                const data = await getStudent(studentId);

                if (!ignore) {
                    setStudent(data);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message);
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        fetchStudent();

    } else if (!loading && !studentId) {
        setIsLoading(false);
    }

    return () => {
        ignore = true;
    };

}, [studentId, loading]);




    return ( <> 
    
        
    
    
    
    
    </> );
}

export default AcademicRecord;