import { axiosUser } from "@/components/api/axios"

const ParticipantApi = {
    all: async ()=>{
        return await axiosUser.get('/api/user/participant')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/user/${id}`)
    },
    create: async (formData)=>{
        return await axiosUser.post(`/api/user/participant/create`, formData)
    },
    session: async (id)=>{
        return await axiosUser.get(`/api/participant/formation/${id}`)
    },
    seance: async (id)=>{
        return await axiosUser.get(`/api/participant/seances/${id}`)
    },
    sessionT: async (id)=>{
        return await axiosUser.get(`/api/participant/formationTerminee/${id}`)
    },
    pointe: async (payload)=>{
        return await axiosUser.post(`/api/pointages`, payload)
    },
    planning: async (id, config = {})=>{
        return await axiosUser.post(`/api/planning/${id}`,{
            ...config,
            responseType: 'blob',
        })
    }
}

export default ParticipantApi;