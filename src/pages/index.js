'use client'
import {useState} from "react";
import {DeleteIcon, EditIcon} from "@/components/Icons";

export default function Home() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modal, showModal] = useState("hidden")
    const [alert, showAlert] = useState("hidden")
    const [update, setUpdate] = useState(false)
    const [product, setProduct] = useState({})

    const fetchData = () => {
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
    const showAllProducts = async () => {
        setProducts([])
        setIsLoading(true)
        await fetchData()

    }
    function createProduct() {
        const productName = document.getElementById('name').value
        const productPrice = document.getElementById('price').value
        if(!productName || !productPrice)  return showAlert(" ")
        showModal("hidden")
        fetch(("https://64cb4d16700d50e3c705ad07.mockapi.io/products"),{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                name: productName,
                price: productPrice
            })
        }).then(() => {
            fetchData()
           document.getElementById('name').value = ''
           document.getElementById('price').value = ''
        })
    }

    function deleteProduct(id) {
        fetch((`https://64cb4d16700d50e3c705ad07.mockapi.io/products/${id}`),{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            }
        }).then(() => {
            fetchData()
        })
    }

    function updateProduct(product) {
        showModal("hidden")
        fetch((`https://64cb4d16700d50e3c705ad07.mockapi.io/products/${product.id}`),{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                price: document.getElementById('price').value
            })
        }).then((r) => {
                showModal("hidden")
                fetchData()
                setUpdate(false)
                document.getElementById('name').value = ''
                document.getElementById('price').value = ''
        })

    }

    function editProduct(product) {
        setUpdate(true)
        setProduct(product)
        showModal(" ")
        document.getElementById('name').value = product.name
        document.getElementById('price').value = product.price
    }

    return (
      <>


          <div className="flex justify-center gap-8 pt-5">
              <button className="btn btn-neutral" onClick={showAllProducts}>
                    Show Products
              </button>
              <label htmlFor="my_modal_6" className="btn" onClick={() => showModal(" ")}>Create Product</label>
              <input type="checkbox" id="my_modal_6" className="modal-toggle" />
              <div className={`modal ${modal}`}>
                  <div className="modal-box flex flex-col justify-center items-center">
                      <div className={`p-5 ${alert}`}>
                          <div className="alert">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                   className="stroke-info shrink-0 w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span>Fields values are missing.</span>
                              <div>
                                  <button className="btn btn-sm" onClick={() => showAlert('hidden')}>OK</button>
                              </div>
                          </div>
                      </div>
                      <h3 className="font-bold text-lg">Create New Product</h3>
                      <div className="form-control w-full max-w-xs">
                          <label className="label">
                              <span className="label-text">Product Name</span>
                          </label>
                          <input id="name" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" required/>
                      </div>
                      <div className="form-control w-full max-w-xs">
                          <label className="label">
                              <span className="label-text">Price</span>
                          </label>
                          <input id="price" type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" required/>
                      </div>
                      <div className="flex justify-center items-end gap-4">
                          {update ? (
                              <div className="modal-action">
                                  <label htmlFor="my_modal_6" className="btn btn-neutral"  onClick={() => updateProduct(product)}>Update</label>
                              </div>
                          ): (
                              <div className="modal-action">
                                  <label htmlFor="my_modal_6" className="btn btn-neutral" onClick={createProduct}>Create</label>
                              </div>
                          )}
                          <div className="modal-action">
                              <label htmlFor="my_modal_6" className="btn">Cancel</label>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="flex justify-center items-center gap-3 flex-wrap p-12">
              {isLoading && <><span className="loading loading-spinner z-20"></span>Loading...</>}
              {products.map((product) => (
                  <div key={product.id} className="flex rounded-3xl flex-col justify-center items-center gap-4 w-[250px] p-4 bg-base-100 shadow-md">
                      <div className="flex justify-center items-center gap-4">
                          <p className="text-2xl font-bold">{product.name}</p>
                          <div className="flex justify-evenly gap-2">
                              <label htmlFor="my_modal_6" className="btn p-2" onClick={() => editProduct(product)}><EditIcon/></label>
                              <button className="btn p-2" onClick={() => deleteProduct(product.id)}><DeleteIcon/></button>
                          </div>
                      </div>
                      <p><span className="font-bold">Price: </span>{product.price}</p>
                  </div>
              ))}
          </div>
      </>


  )
}
