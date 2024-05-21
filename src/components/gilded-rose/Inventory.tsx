import { GildedRose, Item } from "@/lib/gilded-rose/gilded-rose";
import { FormEvent, useState } from "react";
import { InventoryItem } from "./InventoryItem";
import { nanoid } from "nanoid";

interface FormElements extends HTMLFormControlsCollection {
  nameInput: HTMLInputElement;
  sellInInput: HTMLInputElement;
  qualityInput: HTMLInputElement;
}
interface AddFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const Inventory = () => {
  const [items, setItems] = useState<Item[]>([
    new Item(nanoid(), "Rune platebody", 10, 20),
  ]);

  const inventory = new GildedRose(items);

  const advanceDay = () => {
    const updatedItems = inventory.advanceDay();
    setItems([...updatedItems]);
  };

  const handleAddFormSubmit = (event: FormEvent<AddFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;

    setItems([
      ...items,
      new Item(
        nanoid(),
        formElements.nameInput.value,
        Number(formElements.sellInInput.value),
        Number(formElements.qualityInput.value)
      ),
    ]);

    event.currentTarget.reset();
  };

  const handleEditSave = (
    id: Item["id"],
    name: Item["name"],
    sellIn: Item["sellIn"],
    quality: Item["quality"]
  ) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, id, name, sellIn, quality };
      }

      return item;
    });

    setItems(updatedItems);
  };

  const handleRemove = (id: Item["id"]) => {
    const updatedItems = items.filter((item) => item.id !== id);

    setItems(updatedItems);
  };

  return (
    <div>
      <button onClick={advanceDay}>Advance day</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sell in</th>
            <th>Quality</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {inventory.items.map((item) => {
            return (
              <InventoryItem
                key={`${item.id}-${item.sellIn}-${item.quality}`}
                id={item.id}
                name={item.name}
                sellIn={item.sellIn}
                quality={item.quality}
                onSave={handleEditSave}
                onRemove={handleRemove}
              />
            );
          })}
        </tbody>
      </table>

      <form onSubmit={handleAddFormSubmit}>
        <input type="text" placeholder="Name" id="nameInput" />
        <input type="number" placeholder="Sell in" id="sellInInput" />
        <input type="number" placeholder="Quality" id="qualityInput" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
