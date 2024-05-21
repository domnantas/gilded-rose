import { useState } from "react";
import { clamp } from "lodash-es";
import clsx from "clsx";
import { Item } from "@/lib/gilded-rose/gilded-rose";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import classes from "@/components/Inventory/Inventory.module.css";

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

  return isEditMode ? (
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
    <td className={clsx(classes["center-gaps"])}>
      <Button onClick={() => onEditClick?.()}>Edit</Button>
      <Button onClick={() => onRemoveClick?.(item.id)}>Remove</Button>
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
        <Input
          type="text"
          placeholder="Name"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />
      </td>
      <td>
        <Input
          type="number"
          placeholder="Sell in"
          value={sellInInput}
          className={clsx(classes["number-input"])}
          onChange={(event) => setSellInInput(Number(event.target.value))}
        />
      </td>
      <td>
        <Input
          type="number"
          placeholder="Quality"
          value={qualityInput}
          min={0}
          className={clsx(classes["number-input"])}
          onChange={(event) =>
            setQualityInput(clamp(Number(event.target.value), 0, 80))
          }
        />
      </td>
      <td className={clsx(classes["center-gaps"])}>
        <Button
          onClick={() =>
            onSaveClick?.(
              new Item(nameInput, sellInInput, qualityInput, item.id)
            )
          }
        >
          Save
        </Button>
        <Button onClick={() => onCancelClick?.()}>Cancel</Button>
      </td>
    </tr>
  );
};
