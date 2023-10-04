"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
type Product = {
    id: number;
    title: string;
    price: number;
  };
export default function UpdateProducts(product : Product) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [modal, setModal] = useState(false);
  const [isMutating, setisMutating] = useState(false);



  const router = useRouter();
  async function handleUpdate(event: SyntheticEvent) {
    event.preventDefault();
    setisMutating(true);
    await fetch(`http://localhost:5000/product/${product.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    });
    setisMutating(false);
    router.refresh();
    setModal(false);
  }
  const HandleChange = () => {
    setModal(!modal);
  };
  return (
    <div>
      <button className="btn btn-info btn-sm capitalize text-white" onClick={HandleChange}>
        Edit
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={HandleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold-text-lg">Edit {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                className="input w-full input-bordered"
                placeholder="Product Name"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                className="input w-full input-bordered"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={HandleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating....
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
