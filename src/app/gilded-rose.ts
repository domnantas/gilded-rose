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

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  advanceDay() {
    this.items.forEach((item) => {
      switch (item.name) {
        case "Aged Brie": {
          this.updateAgedBrieQuality(item);
          this.decrementSellIn(item);
          break;
        }
        case "Sulfuras, Hand of Ragnaros": {
          break;
        }
        case "Backstage passes to a TAFKAL80ETC concert": {
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

  private decrementSellIn(item: Item) {
    item.sellIn -= 1;
  }

  private updateAgedBrieQuality(item: Item) {
    if (item.sellIn > 0) {
      item.quality = Math.min(item.quality + 1, MAX_QUALITY);
    } else {
      item.quality = Math.min(item.quality + 2, MAX_QUALITY);
    }
  }

  private updateBackstagePassesQuality(item: Item) {
    if (item.sellIn > 10) {
      item.quality = Math.min(item.quality + 1, MAX_QUALITY);
    } else if (item.sellIn > 5) {
      item.quality = Math.min(item.quality + 2, MAX_QUALITY);
    } else if (item.sellIn > 0) {
      item.quality = Math.min(item.quality + 3, MAX_QUALITY);
    } else {
      item.quality = 0;
    }
  }

  private updateRegularQuality(item: Item) {
    if (item.sellIn <= 0) {
      item.quality = Math.max(item.quality - 2, MIN_QUALITY);
    } else {
      item.quality = Math.max(item.quality - 1, MIN_QUALITY);
    }
  }
}
