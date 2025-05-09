// const fetchLocations = async () => {
//     setLoading(true)
//     try {
//         const response = await apiGET(router, `locations?page=${ page - 1 }`, '/admin/asukohad')
//         if (response?.success) {
//             setLocations(response.data.content)
//             setTotalPages(response.data.totalPages)
//             setLoading(false)
//             return
//         }
//         setAlert({ open: true, severity: 'error', msg: 'Asukohtade laadimine ebaõnnestus' })
//         setLoading(false)
//     } catch (e) {
//         setAlert({ open: true, severity: 'error', msg: 'Asukohtade laadimine ebaõnnestus' })
//         setLoading(false)
//     }
// }


// const response = await fetch(`${ API_URL }/${ url }`, {
//     method: 'GET',
//     headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') }
// }

type ResponseType = {
    success: boolean
    message: string
    status: number
    data?: any
    code?: string
}

const backendUrl = process.env.NEXT_PUBLIC_API_URL

export const getAllTasks = async (maxHours: number | null): Promise<ResponseType> => {

    try {
        const response = await fetch(`${backendUrl}/tasks?maxHours=${ maxHours ?? '' }`, {
            method: 'GET',
        })
        if (response.status == 200) {
            console.log('response', response)
            const data = await response.json()
            return { success: true, message: 'Success', status: 200, data }
        }
        return { success: false, message: response.statusText, status: response.status }
    } catch (e) {
        return { success: false, message: 'Request error', status: 500 }
    }
}
