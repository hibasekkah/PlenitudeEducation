import { axiosUser } from "@/components/api/axios"

const EntrepriseApi = {
    create: async (payload)=>{
        return await axiosUser.post('/api/modules',payload)
    },
    all: async ()=>{
        return await axiosUser.get('/api/modules')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/modules/${id}`)
    },
    update: async (id,formData)=>{
        return await axiosUser.put(`/api/modules/${id}`, formData)
    },
}

export default EntrepriseApi