import wave from "@/public/wave.png";

interface TargetClassProps {
  canvas: HTMLElement | null;
  type: "A" | "B" | "C";
}

export default class Target {
  public canvas: HTMLElement | null;
  public width: number = 60;
  public height: number = 60;
  public x: number = 0;
  public y: number = 0;
  public frameX: number = 0;
  public frameY: number = 0;
  public type: "A" | "B" | "C";
  public image: HTMLImageElement = new Image();

  constructor({ canvas, type }: TargetClassProps) {
    this.canvas = canvas;
    this.type = type;
    this.image = new Image();
    this.loadImage();
  }

  private loadImage() {
    const imageLoader = new Image();
    imageLoader.src = wave.src;
    imageLoader.onload = () => {
      this.image = imageLoader;
    };
  }

  update(deltaTime: number) {
    if (this.frameX > 29) return (this.frameX = 0);
    this.frameX++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
