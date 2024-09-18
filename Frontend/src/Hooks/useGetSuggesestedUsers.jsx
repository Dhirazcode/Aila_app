import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSelectedUsers } from "@/Redux/authSlice";
 

const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/user/suggested', { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSelectedUsers(res.data.users)); // Dispatch the correct action
                }
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };

        fetchSuggestedUsers();
    }, [dispatch]); // Add dispatch as a dependency to useEffect
};

export default useGetSuggestedUsers;