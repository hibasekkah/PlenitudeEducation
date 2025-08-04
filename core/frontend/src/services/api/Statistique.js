import { axiosUser } from "@/components/api/axios"

const StatistiqueApi = {
    admin: async ()=>{
        return await axiosUser.get('/api/dashbord/admin')
    },
}

export default StatistiqueApi;