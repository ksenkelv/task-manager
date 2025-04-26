
type ResponseType = {
  success: boolean
  message: string
  status: number
  data?: any
  code?: string
}

const backendUrl = process.env.NEXT_PUBLIC_API_URL

export const save = async (title: string, estimatedHours: number): Promise<ResponseType> => {

  try {
    const response = await fetch(`${backendUrl}/tasks`, {
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
