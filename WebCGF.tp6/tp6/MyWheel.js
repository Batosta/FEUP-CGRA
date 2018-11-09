/**
 * MyWheel
 *
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject
{
	constructor(scene)
    {
    	super(scene);
        this.angle = 0;
    	this.wheel = new MyCylinder(this.scene, 30, 2);
    	this.rim = new MyCircle(this.scene, 30);
        this.deg2rad=Math.PI/180.0;
    };

    setAng(ang){
        this.angle = ang;
    };

	display(){
		

        this.scene.pushMatrix();
        	this.scene.rotate(-this.angle , 0 , 0 ,1) 
			this.scene.tireAppearance.apply();
        	
        	this.scene.pushMatrix();

            	this.scene.scale(.5, .5, .5);
            	this.wheel.display();
        
        	this.scene.popMatrix();

        	this.scene.pushMatrix();
                   
            	var a_rad = 180.0 * this.deg2rad;
            	this.scene.rotate(a_rad, 0, 1, 0);
            	this.scene.rimAppearance.apply();   
            	this.scene.scale(0.5, 0.5, 0.5);
            	this.rim.display();

        	this.scene.popMatrix();

        	this.scene.pushMatrix();
               
            	this.scene.rimAppearance.apply();            
            	this.scene.translate(0, 0, .5);
            	this.scene.scale(0.5, 0.5, 0.5);
            	this.rim.display();

        	this.scene.popMatrix();
        this.scene.popMatrix();
	};
};