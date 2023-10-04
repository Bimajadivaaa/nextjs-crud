import AddProducts from "./addProducts";
import DeleteProducts from "./deleteProducts";
import UpdateProducts from "./updateProducts";
type Product = {
  id: number;
  title: string;
  price: number;
};

async function getProducts() {
  const response = await fetch("http://localhost:5000/product", {cache : 'no-store'});
  return response.json();
}

export default async function ProductList() {
  const products: Product[] = await getProducts();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddProducts/>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="flex space-x-4">
                <UpdateProducts {...product}/>
                <DeleteProducts {...product}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
