import { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ addIcon, list, onAddTask }) => {

    const [visibleForm, setVisibleForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)


    const toggleVisibleForm = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {

        if (!inputValue.trim()) {
            alert('Введите значение')
            return    
        }

        const obj = {
            completed: false,
            listId: list.id,
            text: inputValue
        }

        setIsSubmitting(true)

        axios.post('http://localhost:3001/tasks', obj)
            .then(({ data }) => {
                obj.id = data.id
                onAddTask(list.id, obj)
                toggleVisibleForm()
            })
            .catch(() => {
                alert('Ошибка при добавлении таска')
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return (
        <div className="tasks__form">

        {
            visibleForm ? (
                <div className="tasks__form-block">
                    <input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className="field"
                        type="text"
                        placeholder="Текст задачи"
                    />

                    <button disabled={isSubmitting} onClick={addTask} className="button">
                        { isSubmitting ? 'Добавление...' : 'Добавить задачу' }
                    </button>

                    <button onClick={toggleVisibleForm} className="button button--grey">
                        Отмена
                    </button>
                </div>
            ) 
            : (
                
                <div className="tasks__form-new" onClick={toggleVisibleForm}>
                    <img src={addIcon} alt="Иконка добавить" />
                    <span>Новая задача</span>
                </div>
            )
        }

          

          
        </div>
    );
}

export default AddTaskForm;
