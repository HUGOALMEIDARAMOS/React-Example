import axios from "axios"

export const APIService = {
    getAllStatus: async () => {
        const result = await axios.get("https://api.freeprojectapi.com/api/Enquiry/get-statuses")
        return result.data.data;
    },
    createNewStatus: async (data: any) => {
        const result = await axios.post("https://api.freeprojectapi.com/api/Enquiry/create-status", data)
        return result.data;
    }
}