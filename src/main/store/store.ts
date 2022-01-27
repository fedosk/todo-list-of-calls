import {combineReducers, createStore} from 'redux'
import {appReducer} from "./app-reducer";
import {sortAndFilterReducer} from "./hashtag-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    hashtag: sortAndFilterReducer
})

const saveToLocalStorage = (state: AppRootStateType) => {
    try {
        localStorage.setItem('todo-state', JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const persistedTodosString = localStorage.getItem('todo-state');
        if (persistedTodosString) {
            return JSON.parse(persistedTodosString)
        }
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const preloadedState = loadFromLocalStorage();

export const store = createStore(rootReducer, preloadedState)

store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export type AppStoreType = typeof store
export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;


