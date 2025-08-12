import { axiosUser } from "@/components/api/axios"

const FormateurApi = {
    all: async ()=>{
        return await axiosUser.get('/api/user/formateur')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/user/${id}`)
    },
    create: async (formData)=>{
        return await axiosUser.post(`/api/user/formateur/create`, formData)
    },
}

export default FormateurApi;