import { FormEvent } from "react";
import { Item } from "@/lib/gilded-rose/gilded-rose";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import classes from "@/components/Inventory/Inventory.module.css";
import clsx from "clsx";

interface FormElements extends HTMLFormControlsCollection {
  nameInput: HTMLInputElement;
  sellInInput: HTMLInputElement;
  qualityInput: HTMLInputElement;
}
interface AddFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface InventoryAddFormProps {
  onAdd?: (item: Item) => void;
}

export const InventoryAddForm = ({ onAdd }: InventoryAddFormProps) => {
  const handleAddFormSubmit = (event: FormEvent<AddFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;

    onAdd?.(
      new Item(
        formElements.nameInput.value,
        Number(formElements.sellInInput.value),
        Number(formElements.qualityInput.value)
      )
    );

    event.currentTarget.reset();
  };

  return (
    <form
      onSubmit={handleAddFormSubmit}
      className={clsx(classes["center-gaps"])}
    >
      <Input type="text" placeholder="Name" id="nameInput" />
      <Input
        type="number"
        placeholder="Sell in"
        id="sellInInput"
        className={clsx(classes["number-input"])}
      />
      <Input
        type="number"
        placeholder="Quality"
        id="qualityInput"
        className={clsx(classes["number-input"])}
        min={0}
        max={80}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};
