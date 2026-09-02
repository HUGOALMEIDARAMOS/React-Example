import axios from "axios";
import { useEffect, useState } from "react";
import type { ICategory } from "../type/category";



const CategoryMaster = () => {

    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const [newcategoryList, setNewCategoryList] = useState<ICategory>({
        categoryId: 0,
        categoryName: '',
        isActive: false
    });

    useEffect(() => {
        getAllCategories();
    }, []);

    // const updateCategoryName = 


    const getAllCategories = async () => {
        try {
            const response = await axios.get('https://api.freeprojectapi.com/api/Enquiry/get-categories');
            const categoryList = response.data.data;
            setCategoryList(categoryList);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-7">
                    <div className="card">
                        <div className="card-header bg-warning">category Listing</div>
                        <div className="card-body">
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Category Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categoryList.map((item:ICategory) => {
                                            return   <tr>
                                                <td>{item.categoryName}</td>
                                                <td>{item.isActive ? 'Active' : 'Desabled'}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-warning">Edit</button>
                                                    <button className="btn btn-sm btn-danger mx-2">Delete</button>
                                                </td>
                                             </tr>
                                        })
                                    }                                  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-5">
                    <div className="card">
                        <div className="card-header bg-warning">category Form</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                  <label htmlFor="">Category Name</label>
                                  <input type="text" className="form-control" placeholder="Name"/>
                                </div>  
                                <div className="col-6">
                                  <label htmlFor="">Is Active</label>
                                  <br/>
                                  <input type="checkbox"/>
                                </div>   
                            </div>
                             <div className="row pt-3">
                                <div className="col-6 text-center">
                                    <button className="btn btn-secondary">Reset Form</button>
                                </div>
                                <div className="col-6 text-center">
                                    <button className="btn btn-success">Save Category</button>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryMaster;