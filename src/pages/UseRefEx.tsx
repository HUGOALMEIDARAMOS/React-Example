import { useCallback, useRef, useState } from "react";
import Alert from "../components/alert";
import MyList from "../components/MyList";


const city = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

const UseRefEx = () => {

    const textRefElement = useRef<HTMLInputElement>(null);
    const [courseName, setCourseName] = useState<string>("Angular");
     const [alertTitle, setAlertTitle] = useState<string>("Error");
     const [selectedItem, setSelectedItem] = useState<string>("");

     const changeTitle = () => {
        setAlertTitle("Success");
     }

    const readText = () => {
        const textValue = textRefElement.current?.value;
        alert(`The text entered is: ${textValue}`);
    }

    const changeCourse = () => {
        setCourseName("React");
    }

    const getSelectedItem = useCallback((itemName:string) => {
        setSelectedItem(itemName)
    },[]);

    return (
        <div>
            <h1>UseRef Example - {selectedItem}</h1>
             <div className="row">
                <div className="col-6">
                    <MyList listItem={city}  onSelect={getSelectedItem}/>
                </div>
             </div>
            <Alert alertClassName="alert-danger" alertTitle={alertTitle} alertMessage="This is an error message." />

            <div className="row">
                <div className="col-4">
                    <input type="text" ref={textRefElement} className="form-control" placeholder="Digite o nome" />
                </div>
                <div className="col-2">
                    <button className="btn btn-success" onClick={readText}>Read Text</button>
                </div>
                 <div className="col-3">
                    <button className="btn btn-sm btn-warning" onClick={changeCourse}>Change Courser</button>
                     <button className="btn btn-sm btn-primary" onClick={changeTitle}>Change Title</button>
                </div>
            </div>
        </div>
    )
}

export default UseRefEx;