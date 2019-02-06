/**
 *
 * @param {Vector3} vec3
 * @param width
 * @param height
 * @return {boolean}
 */
import Vector3 from "./Vector3";

export default function isOutOfBounds(vec3, width, height) {
	if(!(vec3 instanceof Vector3)){
		throw new Error('first argument is not of type vector 3');
	}
	return (vec3.x > width || vec3.x < 0 || vec3.y > height || vec3.y < 0)
}