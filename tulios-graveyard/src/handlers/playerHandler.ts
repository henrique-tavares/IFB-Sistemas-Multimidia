import Weapon, { WeaponType } from '../weapons/weapon';
import { TulioData } from '../types';
import Shovel from '../weapons/shovel';

export default class PlayerHandler {
  private _playerData: TulioData | null = null;
  private _initialData: TulioData;

  constructor() {
    this._initialData = {
      weapon: undefined,
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
