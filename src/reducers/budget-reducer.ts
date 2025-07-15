import type { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4} from 'uuid'

//Acciones que realizar la aplicación
export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} | 
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}} |
    {type: 'remove-expense', payload: {id: Expense['id']}} |
    {type: 'edit-expense', payload: {id: Expense['id']}} |
    {type: 'update-expense', payload: {expense: Expense}} |
    {type: 'restart-app'} |
    {type: 'filter-expenses', payload: {id: Category['id']}}


//Tipado de nuestras variables
export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = () : Expense[] => {
    const localStorageExpense = localStorage.getItem('expenses')
    return localStorageExpense ? JSON.parse(localStorageExpense) : []
}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

export const budgetReducer = (
        state: BudgetState = initialState,
        action: BudgetActions
    ) => {
        if(action.type === 'add-budget'){
            return{
                ...state,
                budget: action.payload.budget
            }
        }
        if(action.type === 'show-modal'){
            return{
                ...state,
                modal: true
            }
        }
        if(action.type === 'close-modal'){
            return{
                ...state,
                modal: false,
                editingId: ''
            }
        }
        if(action.type === 'add-expense'){
            //Funcion para genera un unique ID para cada gasto
            //Inidicamos que lo tomara del tipo DraftExpense y nos lo retornara como Expense, el cual es el type el cual 
            //Incluye el ID
            const createExpense = (draftExpense: DraftExpense ) : Expense => {
                return {
                    ...draftExpense, 
                    id: uuidv4()
                }
            }

            const expense = createExpense(action.payload.expense)

            return{
                ...state,
                expenses: [...state.expenses, expense],
                modal: false
            }
        }
        if(action.type === 'remove-expense'){
            return{
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            }
        }
        if(action.type === 'edit-expense'){
            return{
                ...state,
                editingId: action.payload.id,
                modal: true,
            }
        }
        if(action.type === 'update-expense'){
            return{
                ...state,
                expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
                modal: false,
                editingId: ''
            }
        }
        if(action.type === 'restart-app'){
            return{
                ...state,
                expenses: [],
                budget: 0,
            }
        }
        if(action.type === 'filter-expenses'){
            return{
                ...state,
                currentCategory: action.payload.id
            }
        }

    return state
}   