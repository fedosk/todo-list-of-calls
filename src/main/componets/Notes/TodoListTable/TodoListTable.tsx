import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../../store/store"
import {deleteTodoList, InitialStateType} from "../../../store/app-reducer";
import styles from "./TodoListTable.module.scss"
import {Button} from "../../common/Button/Button"
import {
    changeSortConfig,
    changeSorting,
    FilteringType,
    SortConfigType,
    SortType
} from "../../../store/sortAndFilter-reducer";
import {currentTime} from "../../../currentTime";


export function TodoListTable() {

    const dispatch = useDispatch()
    const todoData = useSelector<AppRootStateType, InitialStateType>(state => state.app)
    const sortedBy = useSelector<AppRootStateType, SortType>(state => state.sortAndFilter.sort)
    const sortConfig = useSelector<AppRootStateType, SortConfigType>(state => state.sortAndFilter.sortConfig)
    const filter = useSelector<AppRootStateType, FilteringType>(state => state.sortAndFilter.filter)

    const onDeleteBtnClick = (id: string) => {
        dispatch(deleteTodoList(id))
    }

    let filtredTodoData = [...todoData]

    if (filter === 'all') {
        filtredTodoData = [...todoData]
    }
    if (filter === 'next') {
        let sortedByTime = filtredTodoData.sort((a, b) => a.time > b.time ? 1 : -1)
        let nextTodo = sortedByTime.find(e => e.time > currentTime)
        if (nextTodo) {
            filtredTodoData = [nextTodo]
        } else {
            filtredTodoData = []
        }
    }
    if (filter === 'finished') {
        filtredTodoData = filtredTodoData.filter(t => t.status)
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
                            Time
                        </button>
                    </th>
                    <th className={styles.actions}>Status</th>
                    <th className={styles.actions}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filtredTodoData.reverse().map((elem) => (
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