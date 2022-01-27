import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent} from 'react'
import styles from './Button.module.scss'


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    btn?: boolean
    onClick?: () => void
    classBtn?: string
    disabled?: boolean
}

export const Button: React.FC<SuperButtonPropsType> = (
    {
        className, btn,
        color,
        onClick, classBtn, disabled,
        ...restProps
    }
) => {

    const onClickCallback = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e)
    }

    let btnClassName

    if (classBtn === 'btn') {
        btnClassName = styles.btn
    }
    if (classBtn === 'hashBtn') {
        btnClassName = `${styles.btn} ${styles.hashBtn}`
    }
    if (classBtn === 'confirmBtn') {
        btnClassName = `${styles.btn} ${styles.confirmBtn}`
    }
    if (classBtn === 'bigDeleteBtn') {
        btnClassName = `${styles.btn} ${styles.bigDeleteBtn}`
    }

    return (
        <button
            onClick={onClickCallback}
            className={btnClassName}
            disabled={disabled}
            {...restProps}
        />
    )
}
