import { useState } from "react";
import { GildedRose, Item } from "@/lib/gilded-rose/gilded-rose";
import { InventoryItem } from "@/components/gilded-rose/InventoryItem";
import { InventoryAddForm } from "@/components/gilded-rose/InventoryAddForm";

export const Inventory = () => {
  const [items, setItems] = useState<Item[]>([
    new Item("Rune platebody", 10, 20),
  ]);

  const inventory = new GildedRose(items);

  const advanceDay = () => {
    const updatedItems = inventory.advanceDay();
    setItems([...updatedItems]);
  };

  const handleAdd = (item: Item) => {
    setItems([...items, item]);
  };

  const handleEditSave = (editedItem: Item) => {
    const updatedItems = items.map((item) => {
      if (item.id === editedItem.id) {
        return editedItem;
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
                key={item.id}
                item={item}
                onEditSave={handleEditSave}
                onRemove={handleRemove}
              />
            );
          })}
        </tbody>
      </table>

      <InventoryAddForm onAdd={handleAdd} />
    </div>
  );
};
