'use client'
import {useState} from "react";

export default function Home() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const fetchData = () => {
        setProducts([])
        setIsLoading(true)
        fetch(("https://64cb4d16700d50e3c705ad07.mockapi.io/products"),{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                setProducts(data)
                setIsLoading(false)
            })
        })
    }
  return (
      <>
          <div className="flex justify-center gap-8 pt-5">
              <button className="btn btn-neutral" onClick={fetchData}>
                    Fetch Products
              </button>
          </div>
          <div className="flex justify-center items-center gap-3 flex-wrap p-12">
              {isLoading && <><span className="loading loading-spinner"></span>Loading...</>}
              {products.map((product) => (
                  <div key={product.id} className="flex rounded-3xl flex-col justify-center items-center gap-4 w-[250px] p-4 bg-base-100 shadow-md">
                      <p className="text-2xl font-bold">{product.name}</p>
                      <p><span className="font-bold">Price: </span> ${product.price}</p>
                  </div>
              ))}
          </div>
      </>


  )
}
