/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.quad = new MyQuad(this.scene);
		this.quad.initBuffers();
	};

	display(){
	   
		//face da frente
	    this.scene.pushMatrix();
	    this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//face de trás
		this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//face de cima
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2.0, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//face de baixo
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2.0, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//face da direita
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2.0, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		//face da esquerda
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2.0, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();


		
		//this.pushMatrix();
		//this.popMatrix();
        //this.translate(0, 5, 0);
        //this.scale(5,2,1);
        /*this.deg2rad=Math.PI/180.0;
        var a_rad = 30.0 * this.deg2rad;
        this.rotate(a_rad, 0, 1, 0);*/

	};
};