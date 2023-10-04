"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
  };
export default function DeleteProducts(product : Product) {
  const [modal, setModal] = useState(false);
  const [isMutating, setisMutating] = useState(false);

  const router = useRouter();
  async function handleDelete(productId : number) {
    setisMutating(true);
    await fetch(`http://localhost:5000/product/${productId}`, {
      method: "DELETE",
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
      <button className="btn btn-error btn-sm capitalize text-white" onClick={HandleChange}>
        Delete
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={HandleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold-text-lg">Are you sure to delete {product.title} ?</h3>
            <div className="modal-action">
              <button type="button" className="btn" onClick={HandleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">
                  Delete
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Deleting....
                </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
