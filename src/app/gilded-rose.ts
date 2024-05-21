export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(
    name: Item["name"],
    sellIn: Item["sellIn"],
    quality: Item["quality"]
  ) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const AGED_BRIE = "Aged Brie";
export const SULFURAS = "Sulfuras, Hand of Ragnaros";
export const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";

export class GildedRose {
  items: Item[];
  private MAX_QUALITY = 50;
  private MIN_QUALITY = 0;

  constructor(items: Item[] = []) {
    this.items = items;
  }

  advanceDay() {
    this.items.forEach((item) => {
      switch (item.name) {
        case AGED_BRIE: {
          this.updateAgedBrieQuality(item);
          this.decrementSellIn(item);
          break;
        }
        case SULFURAS: {
          break;
        }
        case BACKSTAGE_PASSES: {
          this.updateBackstagePassesQuality(item);
          this.decrementSellIn(item);
          break;
        }
        default: {
          this.updateRegularQuality(item);
          this.decrementSellIn(item);
        }
      }
    });

    return this.items;
  }

  private clampToMax(value: number) {
    return Math.min(value, this.MAX_QUALITY);
  }

  private clampToMin(value: number) {
    return Math.max(value, this.MIN_QUALITY);
  }

  private decrementSellIn(item: Item) {
    item.sellIn -= 1;
  }

  private updateAgedBrieQuality(item: Item) {
    if (item.sellIn > 0) {
      item.quality = this.clampToMax(item.quality + 1);
    } else {
      item.quality = this.clampToMax(item.quality + 2);
    }
  }

  private updateBackstagePassesQuality(item: Item) {
    if (item.sellIn > 10) {
      item.quality = this.clampToMax(item.quality + 1);
    } else if (item.sellIn > 5) {
      item.quality = this.clampToMax(item.quality + 2);
    } else if (item.sellIn > 0) {
      item.quality = this.clampToMax(item.quality + 3);
    } else {
      item.quality = 0;
    }
  }

  private updateRegularQuality(item: Item) {
    if (item.sellIn <= 0) {
      item.quality = this.clampToMin(item.quality - 2);
    } else {
      item.quality = this.clampToMin(item.quality - 1);
    }
  }
}
