import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../../store/store"
import {deleteTodoList, InitialStateType} from "../../../store/app-reducer";
import styles from "./TodoListTable.module.scss"
import {Button} from "../../common/Button/Button"
import {changeSortConfig, changeSorting, FilteringType, SortConfigType, SortType} from "../../../store/hashtag-reducer";
import {currentTime} from "../TodoList";


export function TodoListTable() {
    const dispatch = useDispatch()
    const todoData = useSelector<AppRootStateType, InitialStateType>(state => state.app)
    const sortedBy = useSelector<AppRootStateType, SortType>(state => state.hashtag.sort)
    const sortConfig = useSelector<AppRootStateType, SortConfigType>(state => state.hashtag.sortConfig)
    const filter = useSelector<AppRootStateType, FilteringType>(state => state.hashtag.filter)

    const onDeleteBtnClick = (id: string) => {
        dispatch(deleteTodoList(id))
    }

    let filtredTodoData = [...todoData]

    if (filter === 'finished') {
        filtredTodoData = filtredTodoData.filter(t => t.status)
    }
    if (filter === 'next') {
        let sortedByTime = filtredTodoData.sort((a, b) => {
            if (a.time < b.time) {
                return sortConfig === 'ascending' ? 1 : -1
            }
            if (b.time < a.time) {
                return sortConfig === 'ascending' ? -1 : 1
            }
            return 0
        })
        let nextTodo = sortedByTime.find(e => e.time > currentTime)
        if (nextTodo) {
            filtredTodoData = [nextTodo]
        } else {
            filtredTodoData = []
        }
    }
    if (filter === 'all') {
        filtredTodoData = [...todoData]
    }

    const onSortedByBtnClick = (sortedBy: SortType) => {
        if (sortConfig === 'descending') {
            dispatch(changeSortConfig('ascending'))
        }
        if (sortConfig === 'ascending') {
            dispatch(changeSortConfig('descending'))
        }
        dispatch(changeSorting(sortedBy))
    }

    if (sortedBy !== null) {
        filtredTodoData.sort((a, b) => {
            if (a[sortedBy] < b[sortedBy]) {
                return sortConfig === 'ascending' ? -1 : 1
            }
            if (a[sortedBy] > b[sortedBy]) {
                return sortConfig === 'ascending' ? 1 : -1
            }
            return 0
        })
    }

    let sortBtnClass = sortConfig === 'ascending' ? `${styles.btn} ${styles.ascending}` : `${styles.btn} ${styles.descending}`

    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                <tr>
                    <th className={styles.title}>
                        <button className={sortedBy === 'name' ? sortBtnClass : styles.btn}
                                onClick={() => onSortedByBtnClick('name')}>
                            Name
                        </button>
                    </th>
                    <th className={styles.text}>Phone number</th>
                    <th className={styles.hashtag}>
                        <button className={sortedBy === 'time' ? sortBtnClass : styles.btn}
                                onClick={() => onSortedByBtnClick('time')}>
                            time
                        </button>
                    </th>
                    <th className={styles.actions}>Status</th>
                    <th className={styles.actions}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filtredTodoData.reverse().map((elem, index) => (
                    <tr key={`key_${elem.id}`}>
                        <td className={styles.title}>
                            <b>
                                {elem.name}
                            </b>
                        </td>
                        <td className={styles.text}>
                            {elem.number}
                        </td>
                        <td className={styles.text}>
                            {elem.time}
                        </td>
                        <td className={styles.actions}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={elem.status}
                                    onChange={() => {
                                    }}/>
                            </label>
                        </td>
                        <td className={styles.actions}>
                            <div>
                                <Button
                                    classBtn={'bigDeleteBtn'}
                                    onClick={() => onDeleteBtnClick(elem.id)}>
                                    Delete
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}