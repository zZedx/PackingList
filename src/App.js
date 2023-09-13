import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDelete(id) {
    setItems((items) => items.filter((i) => i.id !== id));
  }
  function handlePacked(item) {
    setItems((items) =>
      items.map((i) => {
        if (i === item) {
          // i.packed === true ? i.packed = false : i.packed=true ;
          i.packed = !i.packed;
          return i;
        } else return i;
      })
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        handlePacked={handlePacked}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🐻 Far Away 🏃</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuatity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItem(newItem);

    setDescription("");
    setQuatity("1");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ? </h3>
      <select
        name="quantity"
        value={quantity}
        onChange={(e) => setQuatity(parseInt(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((elem) => (
          <option value={elem} key={elem}>
            {elem}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, handleDelete, handlePacked }) {
  return (
    <div className="list">
      {items.length ? <ul>
        {items.map((element) => (
          <Item
            item={element}
            handleDelete={handleDelete}
            handlePacked={handlePacked}
            key={element.id}
          />
        ))}
      </ul> : "Please Add a item"}
    </div>
  );
}

function Item({ item, handleDelete, handlePacked }) {
  return (
    <li>
      <input type="checkbox" onClick={() => handlePacked(item)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  let packedItems = items.filter((i) => i.packed).length;
  return (
    <footer className="stats">
      <em>
        You have {items.length} {items.length > 1 ? "items" : "item"} in your list{" "}
        {items.length && packedItems === items.length?"and all are packed 🥳" :
        packedItems? `, and you packed ${packedItems} 
          ${packedItems > 1 ? "items" : "item"} (${Math.floor(packedItems/items.length*100)}%)`
          : ""}
      </em>
    </footer>
  );
}
