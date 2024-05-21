import clsx from "clsx";
import { useState } from "react";
import {
  AGED_BRIE,
  BACKSTAGE_PASSES,
  CONJURED,
  GildedRose,
  Item,
  SULFURAS,
} from "@/lib/gilded-rose/gilded-rose";
import { InventoryItem } from "@/components/Inventory/InventoryItem";
import { InventoryAddForm } from "@/components/Inventory/InventoryAddForm";
import { Button } from "@/components/ui/Button/Button";
import classes from "@/components/Inventory/Inventory.module.css";
import { Separator } from "@/components/ui/Separator/Separator";

export const Inventory = () => {
  const [items, setItems] = useState<Item[]>([
    new Item("Rune platebody", 10, 20),
    new Item(AGED_BRIE, 10, 20),
    new Item(SULFURAS, 10, 80),
    new Item(BACKSTAGE_PASSES, 10, 20),
    new Item(CONJURED, 10, 20),
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
      <Button onClick={advanceDay}>Advance day</Button>

      <Separator />

      <table className={clsx(classes.table)}>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Name</th>
            <th style={{ width: "20%" }}>Sell in</th>
            <th style={{ width: "20%" }}>Quality</th>
            <th style={{ width: "10%" }}></th>
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

      <Separator />

      <InventoryAddForm onAdd={handleAdd} />
    </div>
  );
};
