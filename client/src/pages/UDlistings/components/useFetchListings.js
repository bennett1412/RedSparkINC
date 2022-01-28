import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

export default function useFetchListings(pageNumber,type) {
  const [loading, setLoading] = useState(true)
  const [listings, setAllListings] = useState([])
  const [totalPages, setTotalPages] = useState()
  const error = useRef()
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true)
    error.current=false;
    let cancel
    axios({
      method: 'GET',
      url: 'http://192.168.1.24:5000/api/get-listings',
      params: { page: pageNumber, type},
      cancelToken: new axios.CancelToken(c => cancel = c),
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => {
      setTotalPages(res.data.totalPages)
      setAllListings(prevListings => {
        return [...new Set([...prevListings, ...res.data.listings])]
      })
      setLoading(false)
    }).catch(err => {
        if(err.response?.status === 403)
          dispatch({type:"LOGOUT"});
        else{
          dispatch({type: 'error',data:"Something went wrong"})
        }
      if (axios.isCancel(err)) return
      error.current= true;
      console.log("setting to true", error.current);
    })
    return () => cancel()
  }, [ pageNumber,type ,dispatch])
  return { loading, error, listings, totalPages }
}