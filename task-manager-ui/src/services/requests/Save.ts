
type ResponseType = {
  success: boolean
  message: string
  status: number
  data?: any
  code?: string
}

export const save = async (title: string | null, estimatedHours: number | null): Promise<ResponseType> => {

  try {
    const response = await fetch(`http://localhost:8080/api/v1/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, estimatedHours})
    })
    const data = await response.json()
    return { success: true, message: 'Success', status: 200, data }
  } catch (e) {
    return { success: false, message: 'Request error', status: 500 }
  }
}
