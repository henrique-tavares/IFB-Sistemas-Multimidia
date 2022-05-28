// TODO

import Item, { ItemType } from "./item";
import Tulio from "./tulio";
import Weapon from "./weapon";

export default class Inventory{
  private inventory: Item[] = [];

  constructor(){}
  

  public insertItemToInventory(player: Tulio, item: Item){
    this.inventory.push(item);
    if(item.itemType === ItemType.weapon){
      player.weapon = item as Weapon;
    }
  }

  public removeItemFromInventory(item: Item){}

  public getInventory(): Item[]{
    return this.inventory;
  }
}