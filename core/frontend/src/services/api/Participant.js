import { axiosUser } from "@/components/api/axios"

const ParticipantApi = {
    all: async ()=>{
        return await axiosUser.get('/api/user/participant')
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

export default ParticipantApi;