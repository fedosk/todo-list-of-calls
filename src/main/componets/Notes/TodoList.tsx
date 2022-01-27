import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from "./TodoList.module.scss";
import {Button} from "../common/Button/Button";
import {TodoListTable} from "./TodoListTable/TodoListTable";
import {useDispatch} from "react-redux";
import {setTodoList} from "../../store/app-reducer";
import {v4} from 'uuid';
import {changeFiltering, FilteringType} from "../../store/hashtag-reducer";


export type UseValidationType = {
    maxLength: number
    isEmpty: boolean
    phoneNumberType?: boolean
}

export const useValidation = (value: string, validations: UseValidationType) => {
    const [isEmpty, setIsEmpty] = useState<boolean>(true)
    const [maxLength, setMaxLength] = useState<boolean>(false)
    const [phoneNumberTypeError, setPhoneNumberTypeError] = useState<boolean>(false)
    const [inputValid, setInputValid] = useState<boolean>(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLength(true) : setMaxLength(false)
                    break;
                case 'isEmpty':
                    value.trim() ? setIsEmpty(false) : setIsEmpty(true)
                    break;
                case 'phoneNumberType':
                    const numberReg = /^(\s*)?(\+|00)((\(\d{1,3}\))|\d{1,3})[\-]?[ ]?(\d[ ]?){9}(\s*)?$/
                    numberReg.test(String(value).toLocaleLowerCase()) ? setPhoneNumberTypeError(false) : setPhoneNumberTypeError(true)
                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || maxLength || phoneNumberTypeError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, maxLength, phoneNumberTypeError])

    return {
        isEmpty,
        maxLength,
        phoneNumberTypeError,
        inputValid
    }
}


export const useInput = (innitialValue: string, validations: UseValidationType) => {
    const [value, setValue] = useState(innitialValue)
    const [isDirty, setIsDirty] = useState(false)

    const valid = useValidation(value, validations)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setIsDirty(true)
    }

    return {
        value,
        setValue,
        setIsDirty,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export const currentTime = new Date().toTimeString().slice(0, -35)

export const TodoList = () => {

    const dispatch = useDispatch()
    const name = useInput('', {isEmpty: true, maxLength: 30})
    const phoneNumber = useInput('', {isEmpty: true, maxLength: 30, phoneNumberType: false})
    const time = useInput('', {isEmpty: true, maxLength: 5})

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
                <div className={styles.inputsWrapper}>
                    <form>
                        {(name.isDirty && name.isEmpty) && <div style={{color: "red"}}>Empty field!</div>}
                        {(name.isDirty && name.maxLength) && <div style={{color: "red"}}>Max length 30!</div>}
                        <input
                            onBlur={e => name.onBlur(e)}
                            onChange={e => name.onChange(e)}
                            value={name.value}
                            type="text"
                            name={'name'}
                            placeholder={'Enter Name...'}/>
                        {(phoneNumber.isDirty && phoneNumber.isEmpty) && <div style={{color: "red"}}>Empty field!</div>}
                        {(phoneNumber.isDirty && phoneNumber.phoneNumberTypeError) &&
                        <div style={{color: "red"}}>Wrong number type!</div>}
                        <input
                            onBlur={e => phoneNumber.onBlur(e)}
                            onChange={e => phoneNumber.onChange(e)}
                            value={phoneNumber.value}
                            type="text"
                            name={'number'}
                            placeholder={'Enter phone number...'}/>
                        {(time.isDirty && time.isEmpty) && <div style={{color: "red"}}>Empty field!</div>}
                        <input
                            onBlur={e => time.onBlur(e)}
                            onChange={e => time.onChange(e)}
                            value={time.value}
                            type="time"
                            name={'time'}/>
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
                <Button
                    classBtn={"confirmBtn"}
                    onClick={() => onFilterBtnClick('all')}>
                    All
                </Button>
                <Button
                    classBtn={"confirmBtn"}
                    onClick={() => onFilterBtnClick('next')}>
                    next
                </Button>
                <Button
                    classBtn={"confirmBtn"}
                    onClick={() => onFilterBtnClick('finished')}>
                    finished
                </Button>
            </div>
            <TodoListTable/>
        </div>
    );
}

