export default abstract class BaseProp extends Phaser.Physics.Arcade.Sprite {
  protected destiny: string;
  
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, destiny?: string) {
    super(scene, x, y, texture.includes("weapon") ? texture : `prop:${texture}`);
    super.name = texture;
    scene.add.existing(this);
    scene.physics.add.existing(this, true);

    if(destiny){
      this.destiny = destiny;
    }
  }

  relativeX(x: number) {
    return (this.displayWidth * x) / 100;
  }

  relativeY(y: number) {
    return (this.displayWidth * y) / 100;
  }

  rescale(scale: number) {
    this.setScale(scale).refreshBody();
  }

  resize({ width = 1, height = 1 }: { width?: number; height?: number }) {
    this.setSize(this.displayWidth * width, this.displayHeight * height);
  }

  offset({ x = 0, y = 0 }: { x?: number; y?: number }) {
    this.setOffset(this.displayWidth * x, this.displayHeight * y);
  }

  addExtraArea(
    area: Phaser.GameObjects.Shape,
    proplessArea?: Phaser.GameObjects.Shape,
    playerColision?: ArcadePhysicsCallback
  ) {
    this.scene.events.emit('add-extra-area', area, proplessArea, playerColision);
  }

  generateOccupiedArea(debug = false) {
    return new Phaser.GameObjects.Rectangle(
      this.scene,
      this.x,
      this.y,
      this.body.width + 50,
      this.body.height + 50,
      0x000,
      debug ? 0.5 : 0
    );
  }

  updatePosition(x: number, y: number) {
    this.setPosition(x, y);
    this.body.x = this.x - this.body.width / 2;
    this.body.y = this.y - this.body.height / 2;
    this.body.center = this.getCenter();
  }

  public getDestiny(){
    return this.destiny;
  }
}
