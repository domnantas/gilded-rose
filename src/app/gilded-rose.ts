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

export class GildedRose {
  items: Item[];

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      // quality adjustment
      if (
        item.name != "Aged Brie" &&
        item.name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (item.quality > 0) {
          if (item.name != "Sulfuras, Hand of Ragnaros") {
            item.quality = item.quality - 1; // Regular item when quality is greater 0
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1; // Aged Brie or Backstage passes when quality is lower than 50
          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1; // Backstage passes when sellIn is lower than 11 and quality is lower than 50
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1; // Backstage passes when sellIn is lower than 6 and quality is lower than 50
              }
            }
          }
        }
      }

      // sellIn adjustment
      if (item.name != "Sulfuras, Hand of Ragnaros") {
        item.sellIn = item.sellIn - 1; // All items except Sulfuras
      }

      // additional quality adjustment when sellIn is lower than 0
      // handles sellIn = 0 case too, because sellIn is decremented above
      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (item.quality > 0) {
              if (item.name != "Sulfuras, Hand of Ragnaros") {
                item.quality = item.quality - 1; // regular item when sellIn is lower than 0 and quality is greater than 0
              }
            }
          } else {
            item.quality = item.quality - item.quality; // Backstage passes when sellIn is lower than 0
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1; // Aged brie when sellIn is lower than 0
          }
        }
      }
    }

    return this.items;
  }
}
