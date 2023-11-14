import wave1 from "@/public/wave1.png";
import wave2 from "@/public/wave2.png";
import wave3 from "@/public/wave3.png";

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
    if (this.type === "A") imageLoader.src = wave1.src;
    if (this.type === "B") imageLoader.src = wave2.src;
    if (this.type === "C") imageLoader.src = wave3.src;

    imageLoader.onload = () => {
      this.image = imageLoader;
    };
  }

  update(deltaTime: number) {
    if (this.frameX > 27) return (this.frameX = 0);
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
