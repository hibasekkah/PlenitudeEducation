import { axiosUser } from "@/components/api/axios"

const SeanceApi = {
    create: async (payload)=>{
        return await axiosUser.post('/api/seances',payload)
    },
    all: async ()=>{
        return await axiosUser.get('/api/seances')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/seances/${id}`)
    },
    update: async (id,formData)=>{
        return await axiosUser.put(`/api/seances/${id}`, formData)
    },
}

export default SeanceApi;