import React from 'react';

//Complemento de cada item de la lista. Renderiza los datos y botones respectivos. Pasa funciones de editar y eliminar a este complemento para ser referenciados.
function Item({ item, deleteItem, editItem}) {
    return (
        <li>
            {item.value} | {item.subject} | {item.grade}<br/>
            <button onClick={() => editItem(item)}>Editar</button>
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
        </li>
    );
}

export default Item;