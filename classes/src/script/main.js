import ParticleEmitter from "./lib/ParticleEmitter.js";
import Particle from "./lib/Particle.js";
import Vector3 from "./lib/Vector3";

const pe = new ParticleEmitter(document.querySelector("canvas"), {
	maxParticles: 1000,
	spawnPerUpdate: 2
});

class GreenParticle extends Particle {
  render(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, 10, 10);
  }
}

pe.addParticleClass(GreenParticle, function(width, height) {
  return {
    x: width / 2,
    y: height / 2,
    z: 0,
    vector: new Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    )
  };
});

pe.addParticleClass(Particle, function() {
  return {
    x: 0,
    y: 0,
    z: 0,
    vector: new Vector3(Math.random(), Math.random(), Math.random())
  };
});

pe.start();
