import { Item } from "@/lib/gilded-rose/gilded-rose";
import { clamp } from "lodash-es";
import { useState } from "react";

interface InventoryItemProps {
  item: Item;
  onEditSave?: (item: Item) => void;
  onRemove?: (id: Item["id"]) => void;
}

export const InventoryItem = ({
  item,
  onEditSave,
  onRemove,
}: InventoryItemProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSaveClick = (item: Item) => {
    setIsEditMode(false);
    onEditSave?.(item);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  return (
    <tr>
      {isEditMode ? (
        <EditModeRow
          item={item}
          onSaveClick={handleSaveClick}
          onCancelClick={handleCancelClick}
        />
      ) : (
        <ViewModeRow
          item={item}
          onEditClick={() => setIsEditMode(true)}
          onRemoveClick={(id) => onRemove?.(id)}
        />
      )}
    </tr>
  );
};

interface ViewModeRowProps {
  item: Item;
  onEditClick?: () => void;
  onRemoveClick?: (id: Item["id"]) => void;
}

const ViewModeRow = ({
  item,
  onEditClick,
  onRemoveClick,
}: ViewModeRowProps) => (
  <tr>
    <td>{item.name}</td>
    <td>{item.sellIn}</td>
    <td>{item.quality}</td>
    <td>
      <button onClick={() => onEditClick?.()}>Edit</button>
      <button onClick={() => onRemoveClick?.(item.id)}>Remove</button>
    </td>
  </tr>
);

interface EditModeRowProps {
  item: Item;
  onSaveClick?: (item: Item) => void;
  onCancelClick?: () => void;
}

const EditModeRow = ({
  item,
  onSaveClick,
  onCancelClick,
}: EditModeRowProps) => {
  const [nameInput, setNameInput] = useState(item.name);
  const [sellInInput, setSellInInput] = useState(item.sellIn);
  const [qualityInput, setQualityInput] = useState(item.quality);

  return (
    <tr>
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
          min={0}
          max={80}
          onChange={(event) =>
            setQualityInput(clamp(Number(event.target.value), 0, 80))
          }
        />
      </td>
      <td>
        <button
          onClick={() =>
            onSaveClick?.(
              new Item(nameInput, sellInInput, qualityInput, item.id)
            )
          }
        >
          Save
        </button>
        <button onClick={() => onCancelClick?.()}>Cancel</button>
      </td>
    </tr>
  );
};
