
import { useEffect, useState } from "react";
import { APIService } from "../services/master";

interface IEnquiry {
    enquiryId: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    message: string;
    categoryId: number;
    statusId: number;
    enquiryType: string;
    isConverted: boolean;
    enquiryDate: string;
    followUpDate: string;
    feedback: string;
}

interface IStatus {
    statusId: number;
    statusName: string;
    isActive: boolean;
}

const EnquiryList = () => {
    const [enquiries, setEnquiries] = useState<IEnquiry[]>([]);
    const [statusList, setStatusList] = useState<IStatus[]>([]);

    useEffect(() => {
        getAllEnquiries();
        getAllStatus();
    }, []);

    const getAllEnquiries = async () => {
        try {
            const result = await APIService.getAllEnquiries();
            setEnquiries(result || []);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        }
    };

    const getAllStatus = async () => {
        try {
            const result = await APIService.getAllStatus();
            setStatusList(result || []);
        } catch (error) {
            console.error("Error fetching statuses:", error);
        }
    };

    const updateStatus = async (item: IEnquiry, newStatusId: number) => {
        try {
            const payload = { ...item, statusId: newStatusId };
            const result = await APIService.updateEnquiryStatus(item.enquiryId, payload);

            if (result?.result) {
                setEnquiries((prev) =>
                    prev.map((row) =>
                        row.enquiryId === item.enquiryId ? { ...row, statusId: newStatusId } : row
                    )
                );
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error updating status");
        }
    };

    const formatDate = (value: string) => {
        if (!value) return "-";
        return new Date(value).toLocaleString();
    };

    return (
        <div className="container-fluid px-3 py-4">
            <div className="card shadow-sm border-0 w-100">
                <div className="card-header bg-warning text-dark fw-bold fs-4">
                    Enquiries List
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover w-100 mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Enquiry ID</th>
                                    <th>Customer Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Category ID</th>
                                    <th>Status ID</th>
                                    <th>Enquiry Type</th>
                                    <th>Converted</th>
                                    <th>Enquiry Date</th>
                                    <th>Follow Up Date</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enquiries.length === 0 ? (
                                    <tr>
                                        <td colSpan={12} className="text-center text-muted py-4">
                                            No enquiries found
                                        </td>
                                    </tr>
                                ) : (
                                    enquiries.map((item) => (
                                        <tr key={item.enquiryId}>
                                            <td>{item.enquiryId}</td>
                                            <td>{item.customerName}</td>
                                            <td>{item.customerEmail}</td>
                                            <td>{item.customerPhone}</td>
                                            <td>{item.message}</td>
                                            <td>{item.categoryId}</td>
                                            <td>
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={item.statusId}
                                                    onChange={(event) => updateStatus(item, Number(event.target.value))}
                                                >
                                                    {statusList.length === 0 ? (
                                                        <option value={item.statusId}>{item.statusId}</option>
                                                    ) : (
                                                        statusList.map((status) => (
                                                            <option
                                                                key={status.statusId}
                                                                value={status.statusId}
                                                            >
                                                                {status.statusName}
                                                            </option>
                                                        ))
                                                    )}
                                                </select>
                                            </td>
                                            <td>{item.enquiryType}</td>
                                            <td>{item.isConverted ? "Yes" : "No"}</td>
                                            <td>{formatDate(item.enquiryDate)}</td>
                                            <td>{formatDate(item.followUpDate)}</td>
                                            <td>{item.feedback || "-"}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiryList;