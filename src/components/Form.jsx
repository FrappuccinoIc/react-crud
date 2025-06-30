import React, { useState, useEffect } from 'react'

function Form({ addOrUpdateItem, itemToEdit }) {
    const [inputValue, setInputValue] = useState('');
    const [inputSubject, setInputSubject] = useState('');
    const [inputGrade, setInputGrade] = useState(1.0);

    useEffect(() => {
        if(itemToEdit) {
            setInputValue(itemToEdit.value);
            setInputSubject(itemToEdit.subject);
            setInputGrade(itemToEdit.grade);
        } else resetInputs()
        localStorage.set
    }, [itemToEdit]);

    const resetInputs = () => {
        setInputValue('');
        setInputSubject('');
        setInputGrade(1.0);
    }

    const registraCambioValor = (e) => {
        setInputValue(e.target.value);
        e.target.setCustomValidity('')
    }
    const registraCambioSubject = (e) => {
        setInputSubject(e.target.value);
        e.target.setCustomValidity('')
    }
    const registraCambioGrade = (e) => {
        setInputGrade(e.target.value);
        e.target.setCustomValidity('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(
            inputValue.trim().length < 3 || inputValue.trim().length > 30 ||
            inputSubject.trim().length < 3 || inputSubject.trim().length > 50
        ) return

        addOrUpdateItem({value: inputValue, subject: inputSubject, grade: inputGrade});
        resetInputs();
    };

    return (
        <form onSubmit={handleSubmit} id="form">
            <label htmlFor="name">Nombre del Alumno:</label>
            <input required type="text" value={inputValue} onChange={(e) => registraCambioValor(e)} id='name' minLength={3} maxLength={30} onInvalid={(e) => e.target.setCustomValidity("Ingrese de 3-30 carácteres.")}/><br/>
            <label htmlFor="subject">Asignatura:</label>
            <input required type="text" value={inputSubject} onChange={(e) => registraCambioSubject(e)} id="subject" minLength={3} maxLength={30} onInvalid={(e) => e.target.setCustomValidity("Ingrese de 3-50 carácteres.")}/><br/>
            <label htmlFor="grade">Promedio:</label>
            <input required type="number" value={inputGrade} onChange={(e) => registraCambioGrade(e)} id="grade" step="0.1" min="1.0" max="7.0" placeholder="1.0" onInvalid={(e) => e.target.setCustomValidity("Ingrese un valor entre 1.0-7.0 ")}/><br/>
            <button>{itemToEdit ? 'Actualizar' : 'Agregar'}</button>
        </form>
    );
}

export default Form;