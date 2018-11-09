/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyFloor extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
	};

	display() 
	{

	    this.scene.pushMatrix();
		this.scene.scale(8, .1, 6);
		this.scene.translate(0, 0.5, 0);
		this.cube.display();
		this.scene.popMatrix();
	};
};