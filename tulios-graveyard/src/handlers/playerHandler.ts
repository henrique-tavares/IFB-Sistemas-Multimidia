import { TulioData } from "../types";

export default class PlayerHandler {
  private _playerData: TulioData | null = null;
  private _initialData: TulioData;

  constructor() {
    this._initialData = {
      weapon: undefined,
      health: 10,
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
