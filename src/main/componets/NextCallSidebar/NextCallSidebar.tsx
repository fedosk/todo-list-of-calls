import React from "react";
import styles from "./NextCallSidebar.module.scss"
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {InitialStateType} from "../../store/app-reducer";


export const NextCallSidebar = () => {

    const todoData = useSelector<AppRootStateType, InitialStateType>(state => state.app)

    let nextCall = todoData.find(elem => !elem.status)

    return (
        <div className={styles.sidebarWrapper}>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th className={styles.hashtag}>Next call</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={styles.hashtag}>
                            <div><b>Name: </b></div>
                            {nextCall && nextCall.name}
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.hashtag}>
                            <div><b>Phone number: </b></div>
                            {nextCall && nextCall.number}
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.hashtag}>
                            <div><b>Time: </b></div>
                            {nextCall && nextCall.time}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}