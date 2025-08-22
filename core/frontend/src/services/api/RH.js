import { axiosUser } from "@/components/api/axios"

const RHApi = {
    all: async ()=>{
        return await axiosUser.get('/api/user/rh')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/user/${id}`)
    },
    create: async (formData)=>{
        return await axiosUser.post(`/api/user/rh/create`, formData)
    },

    session: async (id)=>{
        return await axiosUser.get(`/api/rh/formation/${id}`)
    },
}

export default RHApi;