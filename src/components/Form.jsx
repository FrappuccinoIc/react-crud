import React, { useState, useEffect } from 'react'

function Form({ addOrUpdateItem, itemToEdit }) {
    const [inputValue, setInputValue] = useState({
    });
    setInputValue({value: "", subject: "", grade: 1.0})
    
    useEffect(() => {
        if(itemToEdit) {
            setInputValue(itemToEdit.value);
        } else {
            setInputValue('');
        }
    }, [itemToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(
            inputValue.value.trim().length < 3 || inputValue.value.trim().length > 30 ||
            inputValue.subject.trim().length < 3 || inputValue.subject.trim().length > 50
        ) return

        addOrUpdateItem(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} id="form">
            <label htmlFor="name">Nombre del Alumno:</label>
            <input type="text" value={inputValue.value} onChange={(e) => setInputValue((prev) => {return { ...prev, value: e.target.value }})} id='name'/><br/>
            <label htmlFor="subject">Asignatura:</label>
            <input type="text" value={inputValue.subject} onChange={(e) => setInputValue((prev) => {return { ...prev, subject: e.target.value }})} id="subject"/><br/>
            <label htmlFor="grade">Promedio:</label>
            <input type="number" value={inputValue.grade} onChange={(e) => setInputValue((prev) => {return { ...prev, grade: e.target.value }})} id="grade" step="0.1" min="1.0" max="7.0" placeholder="1.0"/><br/>
            <button>{itemToEdit ? 'Actualizar' : 'Agregar'}</button>
        </form>
    );
}

export default Form;