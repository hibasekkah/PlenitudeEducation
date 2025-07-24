import { axiosUser } from "@/components/api/axios"

const EntrepriseApi = {
    create: async (payload)=>{
        return await axiosUser.post('/api/ateliers',payload)
    },
    all: async ()=>{
        return await axiosUser.get('/api/ateliers')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/ateliers/${id}`)
    },
    update: async (id,formData)=>{
        return await axiosUser.put(`/api/ateliers/${id}`, formData)
    },
}

export default EntrepriseApi