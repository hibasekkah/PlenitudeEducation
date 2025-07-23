import { axiosUser } from "@/components/api/axios"

const EntrepriseApi = {
    create: async (payload)=>{
        return await axiosUser.post('/api/entreprises',payload)
    }
}

export default EntrepriseApi