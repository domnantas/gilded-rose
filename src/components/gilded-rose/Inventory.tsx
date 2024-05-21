import { GildedRose, Item } from "@/lib/gilded-rose/gilded-rose";
import { useState } from "react";

export const Inventory = () => {
  const [items, setItems] = useState<Item[]>([
    new Item("Rune platebody", 10, 20),
  ]);

  const inventory = new GildedRose(items);

  const advanceDay = () => {
    const updatedItems = inventory.advanceDay();
    setItems([...updatedItems]);
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
    </div>
  );
};
