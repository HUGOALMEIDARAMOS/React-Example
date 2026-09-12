import React from "react";

interface AlertModel{
    alertTitle: string;
    alertMessage: string;
    alertClassName: string;
}

const Alert = React.memo((alertData: AlertModel) => {
   
    return (
        <div className={'alert '+ alertData.alertClassName} role="alert">
            <strong>{alertData.alertTitle}!</strong> {alertData.alertMessage}
        </div>
    )
});

export default Alert;