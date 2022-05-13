import axios from 'axios';
import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom'

import editSvg from '../../assets/img/edit.svg';
import addSvg from '../../assets/img/add.svg';

import './Tasks.scss';
import AddTaskForm from './AddTaskForm';
import Task from './Task';

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onDeleteTask }) => {

  const location = useLocation()

  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name)

    if (newTitle && newTitle.trim()) {
      onEditTitle(list.id, newTitle)

      axios.patch(`http://localhost:3001/lists/${list.id}`, {
        name: newTitle
      })
        .catch(() => {
          alert('Не удалось обновить название списка в БД')
        })

    }
  }


  

  return (
    <div className="tasks">
      {
        location.pathname.includes('/lists/') ? (
          <h2 className={classNames('tasks__title', `badge--${list.color.name}`)} style={{
              color: list.color.hex
            }}>
              {list.name}
              <img onClick={editTitle} src={editSvg} alt="Edit icon" />
            </h2>
        ) : (

          <Link to={`lists/${list.id}`}>
          <h2 className={classNames('tasks__title', `badge--${list.color.name}`)} style={{
              color: list.color.hex
            }}>
              {list.name}
              <img onClick={editTitle} src={editSvg} alt="Edit icon" />
            </h2>
          </Link>
          
          ) 
      }

      <div className="tasks__items">

        {!withoutEmpty && list.tasks && !list.tasks.length && <h2 className='empty'>Задачи отсутствуют</h2>}

        {list.tasks && list.tasks.map(task => (
          <Task key={task.id} onDeleteTask={onDeleteTask} listId={list.id} {...task} />
        ))}

        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} addIcon={addSvg} />
        
      </div>

      
    </div>
  );
};

export default Tasks;