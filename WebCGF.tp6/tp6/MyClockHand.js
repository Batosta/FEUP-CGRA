/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{
	constructor(scene, angle, length)
    {
    super(scene);
    this.angle =  -angle;
    this.length = length;
    this.initBuffers();
    };

    initBuffers(){

    	this.vertices = [
				-0.01, 0, 0,
				0.01, 0, 0,
				-0.01, this.length, 0,
				0.01, this.length, 0
				];

		this.indices = [
				0, 1, 2, 
				3, 2, 1
			];
		
		this.normals = [
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1
		];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    };

	
	setAngle(angle){

	    this.angle = angle;
	};
};