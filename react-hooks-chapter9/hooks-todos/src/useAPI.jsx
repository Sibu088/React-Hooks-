import {useState, useEffect} from 'react'
import axios from 'axios'

const useAPI = endpoint => {
  const [data, setData] = useState([]) // initial state empty array

  //To call data when component is mounted, 
  useEffect(()=> {
    getData()
  },[])

  const getData = async () => {
    const response = await axios.get(endpoint)
    setData (response.data)
  }

  return data
}
const getData = async () => {
  try {
    const response = await axios.get(endpoint);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    alert("Failed to connect to the backend. Make sure it's running.");
  }
};

export default useAPI
