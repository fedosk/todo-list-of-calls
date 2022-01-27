import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import styles from './InputText.module.scss'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    formName?: string
    placeholder?: string
    error?: boolean
    onErrorChange?: (value: boolean) => void
    value: string
    maxLength?: number
}

export const InputText: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        className,
        formName, placeholder, value,
        onErrorChange, error, maxLength,

        ...restProps
    }
) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
        onErrorChange && onErrorChange(false)
    }

    return (
        <div className={error ? `${styles.inputWrapper} ${styles.error}` : styles.inputWrapper}>
            <input
                maxLength={maxLength}
                type={type}
                value={value}
                onChange={onChangeCallback}
                placeholder={placeholder}
                className={styles.inputStyle}
                {...restProps}
            />
        </div>
    )
}

