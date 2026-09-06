import { useEffect, useState } from "react";
import { APIService } from "../services/master";


const StatusMaster = () => {


    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        // Fetch status list from API or database
         getAllStatus();
    }, []);

    const getAllStatus = async () => {
        const result = await APIService.getAllStatus();
        setStatusList(result);
    }



    return (
        <div>

            <div className="container-fluid py-4">
                <div className="row g-4">

                    <div className="col-md-7">
                        <div className="card shadow-sm h-100">

                            <div className="card-header bg-warning d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Status List</h5>

                                <button type="button" className="btn btn-dark btn-sm">
                                    <i className="bi bi-plus-lg me-1"></i>
                                    New
                                </button>
                            </div>

                            <div className="card-body">

                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Status Name</th>
                                                <th style={{ width: "120px" }}>Active</th>
                                                <th style={{ width: "160px" }}>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                statusList.map((status) => {
                                                    return <tr>
                                                       <td>{status.statusName}</td>
                                                       <td className="text-center">
                                                        {
                                                            status.isActive ?  <span className="badge bg-success">Yes</span> : <span className="badge bg-danger">No</span>                                                            
                                                        }
                                                       </td>
                                                       <td> 
                                                        <button type="button" className="btn btn-sm btn-outline-primary me-1" > Edit </button> 
                                                        <button type="button" className="btn btn-sm btn-outline-danger" > Delete </button> </td>
                                                    </tr>
                                                })

                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="card shadow-sm h-100">

                            <div className="card-header bg-warning d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Add Status</h5>

                                <button
                                    type="button"
                                    className="btn btn-dark btn-sm"
                                >
                                    <i className="bi bi-x-lg me-1"></i>
                                    Close
                                </button>
                            </div>

                            <div className="card-body">

                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="statusId" className="form-label">
                                            Status ID
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="statusId"
                                            placeholder="Enter status ID"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="statusName" className="form-label">
                                            Status Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            id="statusName"
                                            placeholder="Enter status name"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <div className="form-check form-switch">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="isActive"
                                            />

                                            <label
                                                className="form-check-label"
                                                htmlFor="isActive"
                                            >
                                                Is Active
                                            </label>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end gap-2 mt-4">

                                        <button
                                            type="reset"
                                            className="btn btn-outline-secondary"
                                        >
                                            Reset
                                        </button>

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Save
                                        </button>

                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StatusMaster;