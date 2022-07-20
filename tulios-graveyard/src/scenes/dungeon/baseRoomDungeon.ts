import {
  BackgroundBorderConfig,
  NextRoom,
  NextRoomData,
  RoomDifficulty,
  NextRoomArrowPosition,
  CustomBorder,
} from "../../types";
import BaseRoom from "../utils/baseRoom";

export default abstract class BaseRoomDungeon extends BaseRoom {
  readonly verticalPadding: number = 11;
  readonly horizontalPadding: number = 8;

  constructor(
    key: string,
    borderConfig: BackgroundBorderConfig,
    nextRoom: NextRoom,
    nextRoomData: NextRoomData,
    difficulty: RoomDifficulty,
    nextRoomArrowsPosition?: NextRoomArrowPosition,
    customBorders?: CustomBorder[]
  ) {
    super(
      key,
      borderConfig,
      nextRoom,
      nextRoomData,
      difficulty,
      undefined,
      nextRoomArrowsPosition,
      customBorders
    );
  }

  create() {
    super.create();

    this.data.set("type", "dungeon");
  }
}
