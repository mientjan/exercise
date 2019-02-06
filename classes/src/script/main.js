
import ParticleEmitter from "./lib/ParticleEmitter.js";
import Particle from "./lib/Particle.js";
import Vector3 from "./lib/Vector3";



const pe = new ParticleEmitter(document.querySelector('canvas'));
pe.addParticleClass(Particle, function(){
	return {
		x: 0,
		y: 0,
		z: 0,
		vector: new Vector3(
			Math.random(),
			Math.random(),
			Math.random(),
		)
	}
});

pe.start();