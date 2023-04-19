export const formatoMoneda = cantidad => {

    const opciones = {
        style: 'currency',
        currency: 'USD'
    }
    
return cantidad.toLocaleString('en-US', opciones)
}