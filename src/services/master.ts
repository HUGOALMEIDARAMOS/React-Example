import axios from "axios"

export const APIService = {
    getAllStatus: async () => {
        const result = await axios.get("https://api.freeprojectapi.com/api/Enquiry/get-statuses")
        return result.data.data;
    },
    getAllCategories: async () => {
        const result = await axios.get("https://api.freeprojectapi.com/api/Enquiry/get-categories")
        return result.data.data;
    },
    getAllEnquiries: async () => {
        const result = await axios.get("https://api.freeprojectapi.com/api/Enquiry/get-enquiries")
        return result.data.data;
    },
    getEnquiries: async () => {
        return await APIService.getAllEnquiries();
    },
    createNewStatus: async (data: any) => {
        const result = await axios.post("https://api.freeprojectapi.com/api/Enquiry/create-status", data)
        return result.data;
    },
    createNewEnquiry: async (data: any) => {
        const result = await axios.post("https://api.freeprojectapi.com/api/Enquiry/create-enquiry", data)
        return result.data;
    },
    updateEnquiryStatus: async (id: number, data: any) => {
        const result = await axios.put(`https://api.freeprojectapi.com/api/Enquiry/update-enquiry/${id}`, data)
        return result.data;
    }
}