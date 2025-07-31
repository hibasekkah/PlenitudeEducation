import { axiosUser } from "@/components/api/axios"

const SessionApi = {
    create: async (payload)=>{
        return await axiosUser.post('/api/sessionFormationEntreprise',payload)
    },
    all: async ()=>{
        return await axiosUser.get('/api/sessionFormationEntreprise')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/sessionFormationEntreprise/${id}`)
    },
    update: async (id,formData)=>{
        return await axiosUser.post(`/api/sessionFormationEntreprise/${id}`, formData)
    },
}

export default SessionApi;