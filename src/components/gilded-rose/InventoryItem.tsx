import { Item } from "@/lib/gilded-rose/gilded-rose";
import { useState } from "react";

interface InventoryItemProps {
  id: Item["id"];
  name: Item["name"];
  sellIn: Item["sellIn"];
  quality: Item["quality"];
  onSave?: (
    id: Item["id"],
    name: Item["name"],
    sellIn: Item["sellIn"],
    quality: Item["quality"]
  ) => void;
}

export const InventoryItem = ({
  id,
  name,
  sellIn,
  quality,
  onSave,
}: InventoryItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [sellInInput, setSellInInput] = useState(sellIn);
  const [qualityInput, setQualityInput] = useState(quality);

  const handleSaveClick = () => {
    setIsEditMode(false);
    onSave?.(id, nameInput, sellInInput, qualityInput);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setNameInput(name);
    setSellInInput(sellIn);
    setQualityInput(quality);
  };

  return (
    <tr>
      {isEditMode ? (
        <>
          <td>
            <input
              type="text"
              placeholder="Name"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Sell in"
              value={sellInInput}
              onChange={(event) => setSellInInput(Number(event.target.value))}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Quality"
              value={qualityInput}
              onChange={(event) => setQualityInput(Number(event.target.value))}
            />
          </td>
          <td>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{sellIn}</td>
          <td>{quality}</td>
          <td>
            <button onClick={() => setIsEditMode(true)}>Edit</button>
          </td>
        </>
      )}
    </tr>
  );
};
