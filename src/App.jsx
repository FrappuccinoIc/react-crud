import { useState, useEffect } from 'react'
import Form from './components/Form.jsx';
import List from './components/List.jsx';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [itemToEdit, setItemToEdit] = useState(null);

    useEffect(() => { //función ejecutada con cada cambio en la página, sirve para guardar variables y accederlas incluso recargando la página.
        const storedItems = JSON.parse(window.localStorage.getItem('items')) || [];
        if(storedItems.length !== 0) setItems(storedItems);
    }, []);

    useEffect(() => {
        window.localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    const addOrUpdateItem = (item) => {
        if(itemToEdit) { //Si se tiene un item seleccionado por editar, actualiza tal item. Si no, añade el nuevo item.
            setItems(items.map(foundItem => foundItem.id === itemToEdit.id ? { id: foundItem.id, ...item } : foundItem));
            setItemToEdit(null);
        } else setItems([...items, { id: Date.now(), value: item.value, subject: item.subject, grade: item.grade }]);
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
        if(itemToEdit && id === itemToEdit.id) setItemToEdit(null); //Si el item por eliminar está seleccionado para editar, remueve el texto del item al editar, ya que no puedes editar algo que borraste
    };

    const editItem = (item) => {
        setItemToEdit(item);
    };

    return (
        <div className="App">
            <h1>CRUD con LocalStorage</h1>
            <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
            <List items={items} deleteItem={deleteItem} editItem={editItem} />
        </div>
    );
}

export default App;