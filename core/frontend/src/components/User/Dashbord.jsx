
import { axiosLogout } from "../api/axios";

export default function Dashboard(){
    const onClick = async () => {
        const response = await axiosLogout.post('/api/logout');
      };

    return <>
        <Button onClick="" >Logout</Button>
    </>
            
}