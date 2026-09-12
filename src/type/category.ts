export interface ICategory {
    categoryId: number;
    categoryName: string;
    isActive: boolean;
}

export interface IEnquiry {
    enquiryId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    message: string;
    categoryId: number;
    statusId: number;
    enquiryType: string;
    isConverted: boolean;
    enquiryDate: Date;
    followUpDate: Date;
    feedback: string;
}
