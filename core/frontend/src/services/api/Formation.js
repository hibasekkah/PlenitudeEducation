import { axiosUser } from "@/components/api/axios"

const FormationApi = {
    create: async (payload)=>{
        return await axiosUser.post('/api/formations',payload)
    },
    all: async ()=>{
        return await axiosUser.get('/api/formations')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/formations/${id}`)
    },
    update: async (id,formData)=>{
        return await axiosUser.put(`/api/formations/${id}`, formData)
    },
}

export default FormationApi