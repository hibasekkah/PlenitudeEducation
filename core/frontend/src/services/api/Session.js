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
        return await axiosUser.put(`/api/sessionFormationEntreprise/${id}`, formData)
    },
    sus: async (id,formData)=>{
        return await axiosUser.put(`/api/sessionFormationEntreprise/suspendreSession/${id}`, formData)
    },
    annuler: async (id,formData)=>{
        return await axiosUser.put(`/api/sessionFormationEntreprise/annulerSession/${id}`, formData)
    },
    reactiver: async (id)=>{
        return await axiosUser.put(`/api/sessionFormationEntreprise/activerSession/${id}`)
    },
    affecter: async (id)=>{
        return await axiosUser.post(`/api/sessionUsers`)
    },
}

export default SessionApi;