/**
 * MySky
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MySky extends CGFobject
{
	//constructor(scene, textFront, textBack, textRight, textLeft, textUp, textDown)
	constructor(scene)
	{
		super(scene);
		/*this.textFront = textFront;
		this.textBack = textBack;
		this.textRight = textRight;
		this.textLeft = textLeft;
		this.textUp = textUp;
		this.textDown = textDown;*/
		this.quad = new MyQuad(this.scene);
		this.quad.initBuffers();
	};

	display(){
	   
		//face da frente
	    this.scene.pushMatrix();
	    	this.scene.translate(0, 0, -0.5);
			this.quad.display();
		this.scene.popMatrix();

		//face de trás
		this.scene.pushMatrix();
			//this.scene.rightChassi.apply();
        	this.scene.rotate(Math.PI, 0, 1, 0);
			this.scene.translate(0, 0, -0.5);
			this.quad.display();
		this.scene.popMatrix();

		//face de cima
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2.0, 1, 0, 0);
			this.scene.translate(0, 0, -0.5);
			this.quad.display();
		this.scene.popMatrix();

		//face de baixo
		this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/2.0, 1, 0, 0);
			this.scene.translate(0, 0, -0.5);
			this.quad.display();
		this.scene.popMatrix();

		//face da direita
		this.scene.pushMatrix();
			//this.scene.frontChassi.apply();
			this.scene.rotate(Math.PI/2.0, 0, 1, 0);
			this.scene.translate(0, 0, -0.5);
			this.quad.display();
		this.scene.popMatrix();

		//face da esquerda
		this.scene.pushMatrix();
			//this.scene.backChassi.apply();
			this.scene.rotate(-Math.PI/2.0, 0, 1, 0);
			this.scene.translate(0, 0, -0.5);
			this.quad.display();
		this.scene.popMatrix();
	};
};
