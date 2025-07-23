import { axiosUser } from "@/components/api/axios"

const EntrepriseApi = {
    create: async (payload)=>{
        return await axiosUser.post('/api/entreprises',payload)
    },
    all: async ()=>{
        return await axiosUser.get('/api/entreprises')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/entreprises/${id}`)
    },
    update: async (id,formData)=>{
        return await axiosUser.put(`/api/entreprises/${id}`, formData)
    },
}

export default EntrepriseApi