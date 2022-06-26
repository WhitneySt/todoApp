import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import sun from '../images/icon-sun.svg';
import moon from '../images/icon-moon.svg';
import cross from '../images/icon-cross.svg';
import editIcon from '../images/icon-edit.svg';
import checker from '../images/icon-check.svg';
import { add, edit, toggleStatus, deleteTodoItem, clearCompleted } from "../redux/actions/todoActions";
import { toggleDarkMode } from "../redux/actions/themeActions";

const TodoList = () => {
    const dispatch = useDispatch();
    const { list } = useSelector(store => store.todoReducers);
    const { darkMode } = useSelector(store => store.themeReducers);

    const buttonActiveClassName = "btnActive";
    const [title, setTitle] = useState("");
    const [filterValue, setFilterValue] = useState("all");

// Llamar al dispach para cambiar el tema de ligth a darkmode o viceversa. Esta función se activa al dar click en el btn toggleDarkMode
    const toggleDarkModeTheme = (currentState) => {
        document.documentElement.classList.toggle("dark-mode", currentState);
        dispatch(toggleDarkMode());
    }

    // Asiganar la clase al checkbox y cambiar el status del item cuando la tarea ha sido completada o desmarcada.
    const activeCheck = (elementId) => {
        const checkComponent = document.getElementById(`frm_${elementId}`);
        if (checkComponent.classList[0]) {
            checkComponent.classList.remove("active");
        } else {
            checkComponent.classList.add("active");
        }
        dispatch(toggleStatus({ id: elementId }))

    }
 
    //Mostrar u ocultar el btn de edit de un item cuando se le dá foco a un input
    const activeEdit = (elementId) => {
        const editComponent = document.getElementById(`btnEdit_${elementId}`);
        const visibilityValue = editComponent.style.visibility === "hidden" ? "visible" : "hidden";
        editComponent.style.visibility = visibilityValue;
    }

    //Obtener el btn de filtrado (All, Active, Complete) que tiene la clase active.
    const getActiveButton = (containerId, activeClassName) => {
        const btnfilters = document.getElementById(containerId);
        const children = Object.values(btnfilters.children);
        const activo = children.find(child => child.classList.contains(activeClassName));
        return activo;
    }

    //Remover la clase activa del btn actualmente activo y agregar la clase activa al btn que ha sido seleccionado, además de actualizar el valor del fitro correspondiente.
    const onFilterPressed = (event, containerId, filter) => {
        const activeButton = getActiveButton(containerId, buttonActiveClassName);
        const newActiveButton = event.target;
        activeButton.classList.remove(buttonActiveClassName);
        newActiveButton.classList.add(buttonActiveClassName);
        setFilterValue(filter);
    }

    //Dispara la acción de agregar tarea al todo list
    const onAddTodo = (event) => {
        event.preventDefault();
        const id = list ? list.length + 1 : 1;
        dispatch(add({ id, title }));
        setTitle("");
    }


    // Llama a la función que muestra y oculta el btn editar
    const onEditTodo = (event, todoId) => {
        event.preventDefault();
        activeEdit(todoId)
    }

    //Dispara la acción de eliminar ítem cuando ha sido presionado el btn delete de un ítem específico del todo list
    const onDeleteTodo = (todoId) => {
        dispatch(deleteTodoItem({ id: todoId }));
    }

    //Dispara la acción de editar el title de un ítem del todo list
    const editTodoTitle = (event, todoId) => {
        dispatch(edit({ id: todoId, title: event.target.value }));
    }

    //Estable la cantidad de ítems pendientes
    const itemLeft = list.filter(item => !item.status).length;

    //Filtra el todo list dependiendo del btn de filtro seleccionado que por defecto es 'All'
    let filteredList = [];
    switch (filterValue) {
        case "active":
            filteredList = list.filter(item => !item.status);
            break;
        case "complete":
            filteredList = list.filter(item => item.status);
            break;
        default:
            filteredList = list;
            break;
    }

    return (
        <div>
            <header>
                <div>
                    <h1>TODO</h1>
                    <Tooltip title="Theme">
                        <IconButton sx={{ p: 1 }} onClick={() => {
                            toggleDarkModeTheme(!darkMode);
                        }}>
                            <img id='themeIcon' src={darkMode ? sun : moon} alt='Theme' />
                        </IconButton>
                    </Tooltip>
                </div>
                <form onSubmit={onAddTodo}>
                    <input placeholder='Create a new todo...' value={title} onChange={(event) => setTitle(event.target.value)} />
                    <button type='submit' ></button>
                </form>
            </header>
            <section>
                <div>
                    <ul>
                        {
                            filteredList || filteredList.length ? filteredList.map(item => (
                                <li key={item.id}>
                                    <form id={`frm_${item.id}`} className={item.status ? "active" : ""} onSubmit={(event) => onEditTodo(event, item.id)}>
                                        <button type='button' className='check' onClick={() => activeCheck(item.id)}><img src={checker} alt='Check' /></button>
                                        <input
                                            value={item.title}
                                            onChange={(event) => {
                                                editTodoTitle(event, item.id);
                                            }}
                                            onFocus={() => activeEdit(item.id)}
                                            onBlur={() => activeEdit(item.id)}
                                             />
                                        <Tooltip title="Save edit">
                                            <IconButton type='submit' sx={{ p: 1 }} style={{ visibility: 'hidden' }} id={`btnEdit_${item.id}`}>
                                                <img src={editIcon} alt='edit' />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton sx={{ p: 1 }} onClick={() => {
                                                onDeleteTodo(item.id);
                                            }}>
                                                <img src={cross} alt='Delete' />
                                            </IconButton>
                                        </Tooltip>
                                    </form>
                                </li>
                            )) : null
                        }
                        <li className='filterTab'>
                            <span>{itemLeft} items left</span>
                            <div id='webFilters'>
                                <button id='btnFiltersAll' className={buttonActiveClassName} onClick={(event) => onFilterPressed(event, "webFilters", "all")}>All</button>
                                <button id='btnFiltersActive' onClick={(event) => onFilterPressed(event, "webFilters", "active")}>Active</button>
                                <button id='btnFiltersComplete' onClick={(event) => onFilterPressed(event, "webFilters", "complete")}>Complete</button>
                            </div>
                            <button type='button' onClick={() => dispatch(clearCompleted())}>Clear Completed</button>
                        </li>
                    </ul>
                </div>
                <div className='filters' id='mobileFilters'>
                    <button id='filtersAll' className={buttonActiveClassName} onClick={(event) => onFilterPressed(event, "mobileFilters", "all")}>All</button>
                    <button id='filtersActive' onClick={(event) => onFilterPressed(event, "mobileFilters", "active")}>Active</button>
                    <button id='filtersComplete' onClick={(event) => onFilterPressed(event, "mobileFilters", "complete")}>Complete</button>
                </div>
                <p>Drag and drop to reorder list</p>
            </section>
        </div>
    )
}

export default TodoList