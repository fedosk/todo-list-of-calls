import {ChangeEvent, useEffect, useState} from "react";

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

    const onBlur = () => {
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