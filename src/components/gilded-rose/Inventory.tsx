import { GildedRose, Item } from "@/lib/gilded-rose/gilded-rose";
import { FormEvent, useState } from "react";

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
    new Item("Rune platebody", 10, 20),
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
        formElements.nameInput.value,
        Number(formElements.sellInInput.value),
        Number(formElements.qualityInput.value)
      ),
    ]);
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
          </tr>
        </thead>
        <tbody>
          {inventory.items.map((item, index) => {
            return (
              <tr key={`${item.name}-${index}`}>
                <td>{item.name}</td>
                <td>{item.sellIn}</td>
                <td>{item.quality}</td>
              </tr>
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
