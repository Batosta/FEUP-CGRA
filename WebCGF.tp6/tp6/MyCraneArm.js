/**
 * MyCraneArm
 *
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyCraneArm extends CGFobject
{
	constructor(scene){
    	
    	super(scene);

		this.arm = new MyPrism(this.scene, 4, 20);
		this.armCover = new MyQuad(this.scene);
   	};

	display(){

		this.scene.pushMatrix();
		
			this.scene.scale(0.75, 0.75, 15);
            
	   		this.arm.display();

			this.scene.pushMatrix();
	   	
	   			this.scene.translate(0, 0, 1);
	   			this.scene.rotate(45*degToRad, 0, 0, 1);
	   			this.scene.scale(1.42, 1.42, 1);
	   			this.armCover.display();

			this.scene.popMatrix();
		this.scene.popMatrix();
	};
};