
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { APIService } from "../services/master";

interface ICategoryOption {
    categoryId: number;
    categoryName: string;
    isActive: boolean;
}


const formSchema = z.object({
    customerName: z.string().min(2, { message: "Customer name is required" }),
    customerEmail: z.email({ message: "Enter a valid email" }),
    customerPhone: z.string().min(1, { message: "Enter a valid phone number" }),
    categoryId: z.coerce.number().min(1, { message: "Please select a category" }),
    enquiryType: z.string().min(1, { message: "Please select an enquiry type" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
    statusId: z.number()
});

type NewEnquiryFormType = z.infer<typeof formSchema>;

const NewEnquiryForm = () => {
    const [categoryList, setCategoryList] = useState<ICategoryOption[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<NewEnquiryFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            categoryId: 0,
            enquiryType: "",
            message: "",
            statusId: 275
        }
    });

    useEffect(() => {
        getAllCategories();
    }, []);

    const getAllCategories = async () => {
        const result = await APIService.getAllCategories();
        setCategoryList(result || []);
    };

 
    const onSaveEnquiry = async (data: NewEnquiryFormType) => {
        try {
            const payload = {
                ...data,
                isConverted: false,
                enquiryDate: new Date(),
                followUpDate:  new Date(),
                feedback: "",
                 statusId: 275
            };

            const result = await APIService.createNewEnquiry(payload);

            if (result?.result) {
                alert("Enquiry created successfully");
                reset();
            } else {
                alert("Error occurred while creating enquiry");
            }
        } catch (error: any) {
            console.error("Error creating enquiry:", error);
            alert(error?.response?.data?.message || "Error occurred while creating enquiry");
        }
    };

    return (
        <div className="container py-4">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-warning text-dark fw-bold fs-4">
                    New Enquiry
                </div>

                <div className="card-body p-4">
                    <form onSubmit={handleSubmit(onSaveEnquiry)}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Customer Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter customer name"
                                    {...register("customerName")}
                                />
                                {errors.customerName && <p className="text-danger mt-1 mb-0">{errors.customerName.message}</p>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Customer Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    {...register("customerEmail")}
                                />
                                {errors.customerEmail && <p className="text-danger mt-1 mb-0">{errors.customerEmail.message}</p>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Customer Phone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="(000) 000-0000"
                                    {...register("customerPhone")}
                                />
                                {errors.customerPhone && <p className="text-danger mt-1 mb-0">{errors.customerPhone.message}</p>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Category</label>
                                <select className="form-select" {...register("categoryId")}>
                                    <option value="0">Select category</option>
                                    {categoryList.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && <p className="text-danger mt-1 mb-0">{errors.categoryId.message}</p>}
                            </div>

                      
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Enquiry Type</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="name@example.com"
                                    {...register("enquiryType")}
                                />
                                {errors.enquiryType && <p className="text-danger mt-1 mb-0">{errors.enquiryType.message}</p>}
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">Message</label>
                                <textarea
                                    className="form-control"
                                    rows={4}
                                    placeholder="Write the enquiry message here..."
                                    {...register("message")}
                                />
                                {errors.message && <p className="text-danger mt-1 mb-0">{errors.message.message}</p>}
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button type="button" className="btn btn-outline-secondary" onClick={() => reset()}>
                                Reset
                            </button>
                            <button type="submit" className="btn btn-success">
                                Save Enquiry
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewEnquiryForm;