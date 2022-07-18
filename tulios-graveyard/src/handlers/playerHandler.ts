import { TulioData } from "../types";
import { WeaponType } from "../weapons/weapon";

export default class PlayerHandler {
  private _playerData: TulioData | null = null;
  private _initialData: TulioData;

  constructor() {
    this._initialData = {
      weapons: {
        [WeaponType.shovel]: {
          type: WeaponType.shovel,
          ammo: Infinity,
          picked: false,
        },
        [WeaponType.pistol]: {
          type: WeaponType.pistol,
          ammo: 10,
          picked: false,
        },
        [WeaponType.shotgun]: {
          type: WeaponType.shotgun,
          ammo: 5,
          picked: false,
        },
      },
      health: 10,
      selectedWeapon: undefined,
    };
  }

  public clean() {
    this._playerData = null;
  }

  public get playerData() {
    return this._playerData ?? this._initialData;
  }

  public set playerData(val: TulioData) {
    this._playerData = val;
  }
}
