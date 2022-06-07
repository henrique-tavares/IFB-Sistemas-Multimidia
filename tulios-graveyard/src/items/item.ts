// TODO

export enum ItemType{
  weapon = 0,
  food = 1,
  map = 2
};

export default abstract class Item{
  public itemType: ItemType;

  constructor(){}
}