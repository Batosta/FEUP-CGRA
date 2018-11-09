/**
 * MyChair
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyChair extends CGFobject
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
		this.scene.translate(-0.8, 1.85, -0.8);
		this.scene.scale(0.3, 2, 0.3);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.8, 1.85, -0.8);
		this.scene.scale(0.3, 2, 0.3);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-0.8, 2.3, 0.8);
		this.scene.scale(0.3, 3, 0.3);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.8, 2.3, 0.8);
		this.scene.scale(0.3, 3, 0.3);
		this.cube.display();
		this.scene.popMatrix();
		
		//tampo
		this.scene.madeira.apply();
		this.scene.pushMatrix();
		this.scene.scale(2, 0.3, 2);
		this.scene.translate(0, 10, 0);
		this.cube.display();
		this.scene.popMatrix();

		//encosto
		this.scene.pushMatrix();
		this.deg2rad=Math.PI/180.0;
        var a_rad = 90.0 * this.deg2rad;
        this.scene.rotate(a_rad, 1, 0, 0);
		this.scene.scale(2, 0.3, 2);
		this.scene.translate(0, 2.65, -2.4);
		this.cube.display();
		this.scene.popMatrix();
	};
};
