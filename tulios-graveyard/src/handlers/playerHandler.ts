import Weapon, { WeaponType } from '../items/weapon';
import { TulioData } from '../types';

export default class PlayerHandler {
  private _playerData: TulioData | null = null;
  private _initialData: TulioData;

  constructor() {
    this._initialData = {
      weapon: new Weapon('weapon:shovel', WeaponType.shovel, 2),
      health: 10,
    };
  }

  public get playerData() {
    return this._playerData ?? this._initialData;
  }

  public set playerData(val: TulioData) {
    this._playerData = val;
  }
}
