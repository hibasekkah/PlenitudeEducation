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
    affecter: async (payload)=>{
        return await axiosUser.post(`/api/sessionUsers`,payload)
    },
    desaffecter: async (payload)=>{
        return await axiosUser.post(`/api/sessionUsers/desaffecter`,payload)
    },
    sessions: async (id)=>{
        return await axiosUser.get(`/api/sessionFormationEntreprise/user/${id}`)
    },
    seances: async (id,payload)=>{
        return await axiosUser.get(`/api/sessionFormationEntreprise/seances/${id}`, { params: payload })
    }
}

export default SessionApi;