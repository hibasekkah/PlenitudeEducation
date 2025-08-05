import { axiosUser } from "@/components/api/axios"
import ParticipantApi from "./Participant"

const EntrepriseApi = {
    create: async (payload)=>{
        return await axiosUser.post('/api/entreprises',payload)
    },
    all: async ()=>{
        return await axiosUser.get('/api/entreprises')
    },
    delete: async (id)=>{
        return await axiosUser.delete(`/api/entreprises/${id}`)
    },
    update: async (id, formData) => {
        try {
            return await axiosUser.put(`/api/entreprises/${id}`, formData, {
                headers: {
                    'Accept': 'application/json',
                }
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            throw error;
        }
    },
    participant: async (id) => {
        return await axiosUser.get(`/api/entreprise/participants/${id}`);
    },

    updateWithPut: async (id, formData) => {
        try {
            return await axiosUser.put(`/api/entreprises/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            throw error;
        }
    },

}

export default EntrepriseApi