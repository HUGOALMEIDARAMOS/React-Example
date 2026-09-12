import React from "react";

interface ListModel {
    listItem: string[];
    onSelect: (item:string) => void;
}


const MyList = React.memo( ({ listItem, onSelect }: ListModel) => {
    console.log('COMPONENTE LISTA RENDERIZADO')
    return (
        <ul>
            {
                listItem.map((item, index) => (
                    <li key={index} onClick={() => onSelect(item)}>{item}</li>
                ))
            }
        </ul>
    );
});

export default MyList;