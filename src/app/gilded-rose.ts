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

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        continue;
      }

      if (item.quality < MAX_QUALITY) {
        if (item.name === "Aged Brie") {
          if (item.sellIn > 0) {
            item.quality += 1;
          } else {
            item.quality += 2;
          }
        } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellIn > 10) {
            item.quality += 1;
          }

          if (item.sellIn > 5 && item.sellIn <= 10) {
            item.quality += 2;
          }

          if (item.sellIn > 0 && item.sellIn <= 5) {
            item.quality += 3;
          }

          if (item.sellIn <= 0) {
            item.quality = 0;
          }
        } else {
          // regular item
          if (item.sellIn <= 0) {
            item.quality = Math.max(item.quality - 2, MIN_QUALITY);
          } else {
            item.quality = Math.max(item.quality - 1, MIN_QUALITY);
          }
        }
      }

      item.sellIn = item.sellIn - 1;
    }

    return this.items;
  }
}
