const SET_FILTER = 'SET_FILTER'
const CHANGE_SORTING = 'table/CHANGE_SORTING'
const CHANGE_SORT_CONFIG = 'table/CHANGE_SORT_CONFIG'


export type FilteringType = 'all' | 'next' | 'finished'
export type SortType = 'time' | 'name'
export type SortConfigType = 'ascending' | 'descending'


export type InitialStateType = {
    filter: FilteringType
    sort: SortType
    sortConfig: SortConfigType
}

const initialState: InitialStateType = {
    filter: 'all',
    sort: 'name',
    sortConfig: 'ascending'
}

export const sortAndFilterReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_FILTER:
            return {...state, filter: action.filter}
        case CHANGE_SORTING: {
            return {...state, sort: action.sortedBy}
        }
        case CHANGE_SORT_CONFIG: {
            return {...state, sortConfig: action.sortConfig}
        }
        default:
            return state
    }
}

export const changeFiltering = (filter: FilteringType) => ({type: SET_FILTER, filter} as const)
export const changeSorting = (sortedBy: SortType) => ({type: CHANGE_SORTING, sortedBy} as const)
export const changeSortConfig = (sortConfig: SortConfigType) => ({type: CHANGE_SORT_CONFIG, sortConfig} as const)


type ActionsType = ReturnType<typeof changeFiltering>
    | ReturnType<typeof changeSorting>
    | ReturnType<typeof changeSortConfig>
