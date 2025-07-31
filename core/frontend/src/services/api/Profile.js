import { axiosUser } from "@/components/api/axios"

const ProfileApi = {
    update: async (id,formData)=>{
        return await axiosUser.post(`/api/user/update/${id}`, formData)
    },
    password: async (formData)=>{
        return await axiosUser.post(`/api/user/password`, formData)
    },
}

export default ProfileApi;