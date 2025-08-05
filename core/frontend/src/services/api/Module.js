import { axiosUser } from "@/components/api/axios"

const ModuleApi = {
    create: async (payload) => {
        return await axiosUser.post('/api/modules', payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    all: async () => {
        return await axiosUser.get('/api/modules')
    },
    delete: async (id) => {
        return await axiosUser.delete(`/api/modules/${id}`)
    },
    update: async (id, payload) => {
        console.log('ModuleApi.update - Type reçu:', typeof payload);
        console.log('ModuleApi.update - Constructor:', payload?.constructor?.name);
        console.log('ModuleApi.update - Is FormData?', payload instanceof FormData);
        console.log('ModuleApi.update - Payload:', payload);
        
        if (!(payload instanceof FormData)) {
            console.error('Expected FormData but received:', payload);
            throw new Error(`Expected FormData object for update method, but received ${typeof payload}`);
        }
        
        if (!payload.has('_method')) {
            payload.append('_method', 'PUT');
        }
        
        return await axiosUser.post(`/api/modules/${id}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
}

export default ModuleApi