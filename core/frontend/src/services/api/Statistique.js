import { axiosUser } from "@/components/api/axios"

const StatistiqueApi = {
    admin: async ()=>{
        return await axiosUser.get('/api/dashbord/admin')
    },
    formation: async (id)=>{
        return await axiosUser.get(`/api/dashbord/admin/formation/${id}`)
    },
}

export default StatistiqueApi;