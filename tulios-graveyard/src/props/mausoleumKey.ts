import BaseProp from "./baseProp";

export default class MausoleumKey extends BaseProp {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "graveyard:key");

    this.on("picked", (searchingForKey: boolean) => {
      scene.scene.run("dialog", {
        character: "Túlio",
        dialogs: searchingForKey
          ? [
              "Aha!, finalmente te achei, sua chave danada.",
              "Agora, posso abrir a porta do mausoléu",
            ]
          : ["Hmmm, uma chave?", "Me pergunto o que ela abre."],
      });
      this.destroy(true);
    });
  }
}
