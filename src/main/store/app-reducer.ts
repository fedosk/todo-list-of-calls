const SET_TODO_LIST = 'SET_TODO_LIST'
const DELETE_TODO_LIST = 'DELETE_TODO_LIST'

export type TodoDataType = {
    name: string
    number: string
    time: string
    status: boolean
    id: string
}

export type InitialStateType = TodoDataType[]

const initialState: InitialStateType = []

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_TODO_LIST:
            return [...state, action.todoListData]
        case DELETE_TODO_LIST:
            return state.filter(n => n.id !== action.id)
        default:
            return state
    }
}

export const setTodoList = (todoListData: TodoDataType) => ({type: SET_TODO_LIST, todoListData} as const)
export const deleteTodoList = (id: string) => ({type: DELETE_TODO_LIST, id} as const)

type ActionsType = ReturnType<typeof setTodoList>
    | ReturnType<typeof deleteTodoList>