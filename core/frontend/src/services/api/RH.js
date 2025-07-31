import { axiosUser } from "@/components/api/axios"

const RHApi = {
    all: async ()=>{
        return await axiosUser.get('/api/user/rh')
    },
    // all: async ()=>{
    //     return await axiosUser.get('/api/ateliers')
    // },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/user/${id}`)
    },
    // update: async (id,formData)=>{
    //     return await axiosUser.put(`/api/ateliers/${id}`, formData)
    // },
}

export default RHApi;