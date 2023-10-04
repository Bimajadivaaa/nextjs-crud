"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function AddProducts() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setisMutating] = useState(false);

  const router = useRouter();
  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setisMutating(true);
    await fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    });
    setisMutating(false);
    setTitle("");
    setPrice("");
    router.refresh();
    setModal(false);
  }
  const HandleChange = () => {
    setModal(!modal);
  };
  return (
    <div>
      <button className="btn" onClick={HandleChange}>
        Add New
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={HandleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold-text-lg">Add new product</h3>
          <form onSubmit={handleSubmit}>
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
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={HandleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving....
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
