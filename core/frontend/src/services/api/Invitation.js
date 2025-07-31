import { axiosUser } from "@/components/api/axios"

const InvitationApi = {
    send: async (payload)=>{
        return await axiosUser.post('/api/invitation/send',payload)
    },
    register: async (payload)=>{
        return await axiosUser.post('/api/invitation/register',payload)
    },
}

export default InvitationApi;