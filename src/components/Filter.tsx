import type { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function Filter() {

    const {dispatch} = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'filter-expenses', payload: {id: e.target.value}})
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtar Gastos</label>
                    <select id="category"
                    className="bg-slate-100 p-3 flex-1 rounded"
                    onChange={handleChange}>
                        <option value=""> --- Todas las Categorías --- </option>
                        {categories.map(category => (
                            <option value={category.id} key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
  )
}
