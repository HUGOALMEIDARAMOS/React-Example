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

    const updateCategoryName = (event: any) => {
        setNewCategoryList(oldObj => ({ ...oldObj, categoryName: event.target.value }));
    }

    const updateIsActive = (event: any) => {
        setNewCategoryList(oldObj => ({ ...oldObj, isActive: event.target.checked }));
    }

    const onSaveCategory = async () => {
        try {
            const response = await axios.post('https://api.freeprojectapi.com/api/Enquiry/create-category', newcategoryList);
            if(response.data.result){
                alert('Category saved successfully');
                getAllCategories();
            }else{
                alert('Failed to save category');
            }
        } catch (error) {
            console.error('Error saving category:', error);
        }
    }

    const onEdit = (item: ICategory) => {
        setNewCategoryList(item);
    }

    const onDelete = async (categoryId: number) => {
        try {
            const isConfirmed = window.confirm('Are you sure you want to delete this category?');
            if (!isConfirmed) {
                return; // Exit if the user cancels the deletion
            }
            const response = await axios.delete(`https://api.freeprojectapi.com/api/Enquiry/delete-category/${categoryId}`);
            if(response.data.result){
                alert('Category deleted successfully');
                getAllCategories();
            }else{
                alert('Failed to delete category');
            }               
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    const onReset = () => {
        setNewCategoryList({
            categoryId: 0,
            categoryName: '',
            isActive: false
        });
    }

    const onUpdateCategory = async () => {
        try {
            const response = await axios.put('https://api.freeprojectapi.com/api/Enquiry/update-category/'+newcategoryList.categoryId, newcategoryList);
            if(response.data.result){
                alert('Category updated successfully');                 
                getAllCategories();
            }else{
                alert('Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    }


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
                                        categoryList.map((item: ICategory) => {
                                            return <tr>
                                                <td>{item.categoryName}</td>
                                                <td>{item.isActive ? 'Active' : 'Desabled'}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-warning" onClick={() => onEdit(item)}>Edit</button>
                                                    <button className="btn btn-sm btn-danger mx-2" onClick={() => onDelete(item.categoryId)}>Delete</button>
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
                        <div style={{ backgroundColor: 'lightblue' }}>{newcategoryList.categoryName} --- {newcategoryList.isActive ? 'Active' : 'Inactive'}</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">Category Name</label>
                                    <input type="text" value={newcategoryList.categoryName} className="form-control" placeholder="Name" onChange={(eve) => updateCategoryName(eve)} />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Is Active</label>
                                    <br />
                                    <input type="checkbox" checked={newcategoryList.isActive} onChange={(eve) => updateIsActive(eve)} />
                                </div>
                            </div>
                            <div className="row pt-3">
                                <div className="col-6 text-center">
                                    <button className="btn btn-secondary" onClick={onReset}>Reset Form</button>
                                </div>
                                <div className="col-6 text-center">
                                    {
                                        newcategoryList.categoryId === 0 ? <button className="btn btn-success" onClick={onSaveCategory}>Save Category</button> : <button className="btn btn-warning" onClick={onUpdateCategory}>Update Category</button>
                                    }
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