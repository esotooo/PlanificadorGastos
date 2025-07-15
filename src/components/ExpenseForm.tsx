import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState, type ChangeEvent } from "react";
import type { DraftExpense } from "../types";
import type { Value } from "../types/index";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const {dispatch, state, totalAvailable} = useBudget()
    const [previous, setPrevious] = useState(0)

    useEffect(() => {
        if(state.editingId){
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPrevious(editingExpense.amount)
        }
    }, [state.editingId])

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name] : isAmountField ? value === '' ? '' : Number(value) : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        

        //Validar el formulario
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        //Validar que haya suficiente saldo disponible
        if((expense.amount - previous) > totalAvailable){
            setError('No hay presupuesto suficiente')
            return
        }

        //Agregar o actualizar un gasto
        if(state.editingId){
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        }else{
            dispatch({type: 'add-expense', payload: { expense }})
        }
        
        //Reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPrevious(0)
    }


    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500">
                {state.editingId ? 'Actualizar Gasto' : 'Agregar Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">

                <label htmlFor="expenseName" 
                className="text-xl">
                    Nombre Gasto: 
                </label>

                <input type="text" 
                id="expenseName" 
                placeholder="Añade el nombre del gasto" 
                className="bg-slate-100 p-2" 
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}/>

            </div>

            <div className="flex flex-col gap-2">

                <label htmlFor="amount" 
                className="text-xl">
                    Cantidad: 
                </label>

                <input type="number" 
                id="amount" 
                placeholder="Añade la cantidad del gasto. Ej. 300" 
                className="bg-slate-100 p-2" 
                name="amount"
                min="1"
                value={expense.amount}
                onChange={handleChange}/>
                
            </div>


            <div className="flex flex-col gap-2">

                <label htmlFor="amount" 
                className="text-xl">
                    Categoria: 
                </label>

                <select 
                name="category" 
                id="category"
                className="bg-slate-200 p-2"
                value={expense.category}
                onChange={handleChange}>
                    <option value="">---Seleccione una categoría----</option>  
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))} 
                </select>
                
            </div>


            <div className="flex flex-col gap-2">

                <label htmlFor="amount" 
                className="text-xl">
                    Fecha Gasto:
                </label>

                <DatePicker 
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
                
            </div>

            <input type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={state.editingId ? 'Actualizar' : 'Guardar'}/>

        </form>
  )
}
