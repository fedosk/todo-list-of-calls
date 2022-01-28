import React from 'react';
import styles from "./TodoList.module.scss";
import {Button} from "../common/Button/Button";
import {TodoListTable} from "./TodoListTable/TodoListTable";
import {useDispatch, useSelector} from "react-redux";
import {setTodoList} from "../../store/app-reducer";
import {v4} from 'uuid';
import {changeFiltering, FilteringType} from "../../store/sortAndFilter-reducer";
import {useInput} from "../../customHooks/validation";
import {currentTime} from "../../currentTime";
import {AppRootStateType} from "../../store/store";


export const TodoList = () => {

    const dispatch = useDispatch()
    const name = useInput('', {isEmpty: true, maxLength: 30})
    const phoneNumber = useInput('', {isEmpty: true, maxLength: 30, phoneNumberType: false})
    const time = useInput('', {isEmpty: true, maxLength: 5})
    const filter = useSelector<AppRootStateType, FilteringType>(state => state.sortAndFilter.filter)

    const onClickCreateNoteBtn = () => {
        let currentTodoStatus = currentTime > time.value

        dispatch(setTodoList({
            name: name.value,
            number: phoneNumber.value,
            time: time.value,
            status: currentTodoStatus,
            id: v4()
        }))

        name.setValue('')
        name.setIsDirty(false)
        phoneNumber.setValue('')
        phoneNumber.setIsDirty(false)
        time.setValue('')
        time.setIsDirty(false)
    }

    const onFilterBtnClick = (filter: FilteringType) => {
        dispatch(changeFiltering(filter))
    }

    return (
        <div className={styles.notesWrapper}>
            <div className={styles.notesCreationBarWrapper}>
                <div className={styles.inputsContainer}>
                    <form>
                        <div className={styles.inputWrapper}>
                            {(name.isDirty && name.isEmpty) &&
                            <div style={{color: "red"}}>Empty field!</div>}
                            {(name.isDirty && name.maxLength) &&
                            <div style={{color: "red"}}>Max length 30!</div>}
                            <input
                                className={styles.todoInput}
                                onBlur={e => name.onBlur(e)}
                                onChange={e => name.onChange(e)}
                                value={name.value}
                                type="text"
                                name={'name'}
                                placeholder={'Enter Name...'}/>
                        </div>
                        <div className={styles.inputWrapper}>
                            {(phoneNumber.isDirty && phoneNumber.isEmpty) &&
                            <div style={{color: "red"}}>Empty field!</div>}
                            {(phoneNumber.isDirty && phoneNumber.phoneNumberTypeError) &&
                            <div style={{color: "red"}}>Wrong number type!</div>}
                            <input
                                className={styles.todoInput}
                                onBlur={e => phoneNumber.onBlur(e)}
                                onChange={e => phoneNumber.onChange(e)}
                                value={phoneNumber.value}
                                type="text"
                                name={'number'}
                                placeholder={'Enter phone number...'}/>
                        </div>
                        <div className={styles.inputWrapper}>
                            {(time.isDirty && time.isEmpty) &&
                            <div style={{color: "red"}}>Empty field!</div>}
                            <input
                                className={styles.todoInput}
                                onBlur={e => time.onBlur(e)}
                                onChange={e => time.onChange(e)}
                                value={time.value}
                                type="time"
                                name={'time'}/>
                        </div>
                    </form>
                </div>
                <Button
                    classBtn={"confirmBtn"}
                    onClick={onClickCreateNoteBtn}
                    disabled={!name.inputValid || !phoneNumber.inputValid || !time.inputValid}>
                    Save
                </Button>
            </div>
            <div className={styles.filterBtnWrapper}>
                <button
                    className={filter === 'all' ? `${styles.btn} ${styles.active}` : styles.btn}
                    onClick={() => onFilterBtnClick('all')}>
                    All
                </button>
                <button
                    className={filter === 'next' ? `${styles.btn} ${styles.active}` : styles.btn}
                    onClick={() => onFilterBtnClick('next')}>
                    Next
                </button>
                <button
                    className={filter === 'finished' ? `${styles.btn} ${styles.active}` : styles.btn}
                    onClick={() => onFilterBtnClick('finished')}>
                    Finished
                </button>
            </div>
            <TodoListTable/>
        </div>
    );
}

