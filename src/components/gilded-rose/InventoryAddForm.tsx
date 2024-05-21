import { FormEvent } from "react";
import { Item } from "@/lib/gilded-rose/gilded-rose";

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
    <form onSubmit={handleAddFormSubmit}>
      <input type="text" placeholder="Name" id="nameInput" />
      <input type="number" placeholder="Sell in" id="sellInInput" />
      <input
        type="number"
        placeholder="Quality"
        id="qualityInput"
        min={0}
        max={80}
      />
      <button type="submit">Add</button>
    </form>
  );
};
