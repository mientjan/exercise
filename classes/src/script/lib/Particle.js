import Vector3 from "./Vector3.js";

export default class Particle extends Vector3 {
  constructor({ x, y, z, vector, timeToLive = 1000 }) {
    super(x, y, z);

    this.timeToLive = timeToLive;
    this.vector = vector;
  }

  update(){
	  this.x += this.vector.x;
	  this.y += this.vector.y;
	  this.z += this.vector.z;
	  this.timeToLive = Math.max(0, this.timeToLive - 1);
  }

  render(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, 10, 10);
  }
}
