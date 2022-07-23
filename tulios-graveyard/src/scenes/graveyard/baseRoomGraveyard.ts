import {
  BackgroundBorderConfig,
  NextRoom,
  NextRoomData,
  RoomDifficulty,
  RoomSize,
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
    difficulty: RoomDifficulty
  ) {
    super(key, borderConfig, nextRoom, nextRoomData, difficulty, roomSize, undefined, undefined);
  }

  create() {
    super.create();

    this.data.set("type", "graveyard");
  }
}
