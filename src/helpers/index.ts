export function formatCurrency(amount:number){
    return new Intl.NumberFormat('es-GT',{
        style: "currency", currency: 'GTQ'
    }).format(amount)
}

export function formatDate(dateStr: string) : string{
    const dateObject = new Date(dateStr)
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-GT', options).format(dateObject)
}