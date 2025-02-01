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

import process from "process";
import {useEffect} from "react";

type ResponseType = {
    success: boolean
    message: string
    status: number
    data?: any
    code?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getAllTasks = async (maxHours?: number): Promise<ResponseType> => {

    try {
        const response = await fetch(`http://localhost:8080/api/v1/tasks?maxHours=${ maxHours ?? '' }`, {
            method: 'GET',
        })
        const data = await response.json()
        return { success: true, message: 'Success', status: 200, data }
    } catch (e) {
        return { success: false, message: 'Request error', status: 500 }
    }
}