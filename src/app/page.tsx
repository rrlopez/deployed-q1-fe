'use client'
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent } from "react";

interface ProductProps {
  id: number
  name: string
  price: string
}


const queryClient = new QueryClient()

export default function Home() {
  return (<QueryClientProvider client={queryClient}>
    <Content/>
  </QueryClientProvider>);
}

function Content() {
  const mutation = useMutation<ProductProps[], unknown, {type: string}>({
    mutationFn: async ({type})=>{
      if(!type) return
      const {data} = await axios.get(`${process.env.APP_BACKEND_URL}/products/${type}`)
      return data
    },
  })


  const handleChange = (e: ChangeEvent<HTMLSelectElement>)=>{
    mutation.mutate({
      type: e.target.value
    })
  }

  mutation.data = mutation.data || []

  return (
    <main className="flex min-h-screen flex-col p-24">
      <select className="select select-bordered w-full" onChange={handleChange}>
        <option value=''>Select shop</option>
        <option value='kidsWorld'>Kids world</option>
        <option value='toyUniverse'>Toy Universe</option>
        <option value='toyShop'>Toy Shop</option>
      </select>
      <h1 className="text-left">Products</h1>
      <div className="grow">
        <table className="table compact table-zebra border dark:border-base-200 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {mutation.data.map(({id, name, price}: ProductProps)=>(<tr key={id}>
              <td>{name}</td>
              <td className="w-32">{`$${parseFloat(`${price}`.replace('$', ''))}`}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </main>);
}
