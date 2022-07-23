import {
  BackgroundBorderConfig,
  NextRoom,
  NextRoomData,
  RoomSize,
  RoomDifficulty,
} from "../../types";
import BaseRoom from "../utils/baseRoom";

export default abstract class BaseRoomGraveyard extends BaseRoom {
  readonly verticalPadding: number = 17;
  readonly horizontalPadding: number = 6.5;

  constructor(
    key: string,
    borderConfig: BackgroundBorderConfig,
    nextRoom: NextRoom,
    nextRoomData: NextRoomData,
    roomSize: RoomSize,
    difficulty: RoomDifficulty,
    playerInitialPos?: { x: number; y: number }
  ) {
    super(key, borderConfig, nextRoom, nextRoomData, difficulty, roomSize, undefined, undefined, playerInitialPos);
  }

  create() {
    super.create();

    this.data.set("type", "graveyard");
  }
}
