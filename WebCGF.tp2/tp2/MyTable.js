/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.cube = new MyUnitCubeQuad(this.scene);
	};

	display() 
	{
		this.scene.metalic.apply();
		//pernas
		this.scene.pushMatrix();
		this.scene.translate(-2, 1.85, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2, 1.85, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2, 1.85, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2, 1.85, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.cube.display();
		this.scene.popMatrix();
		
		this.scene.madeira.apply();

		//tampo
		this.scene.pushMatrix();
		this.scene.scale(5, 0.3, 3);
		this.scene.translate(0, 12.5, 0);
		this.cube.display();
		this.scene.popMatrix();
	};
};