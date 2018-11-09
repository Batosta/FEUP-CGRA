/**
 * MyClock
 *
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject
{
	constructor(scene, slices)
    {
    	super(scene);
    	this.slices = slices;
    	this.cylinder = new MyCylinder(this.scene, this.slices, 2);
    	this.clockHourHand = new MyClockHand(this.scene, 90, 0.20);
    	this.clockMinHand = new MyClockHand(this.scene, 180, 0.375);
    	this.clockSecHand = new MyClockHand(this.scene, 270 , 0.55);
    	this.tampo = new MyCircle(this.scene, this.slices);
    	this.lastCurrTime = -1;
    };

	display(){
		
		var deg2Rad = Math.PI/180;
		
		this.scene.translate(7.25, 7.2, 0);
		this.scene.pushMatrix();
			this.scene.scale(.6, .6, .2);
			this.cylinder.display();
			this.scene.clockAppearance.apply();
			this.scene.translate(0, 0, 1);
			this.tampo.display();
		this.scene.popMatrix();

		this.scene.madeira.apply();
		this.scene.translate(0, 0, 0.25)
		//Clock Seconds Hand
		this.scene.pushMatrix();

			this.scene.rotate(this.clockSecHand.angle * deg2Rad , 0 , 0, 1);
			this.clockSecHand.display();
		this.scene.popMatrix();

		//Clock Minutes Hand
		this.scene.pushMatrix();

			this.scene.rotate(this.clockMinHand.angle * deg2Rad , 0 , 0, 1);
			this.clockMinHand.display();
		this.scene.popMatrix();
		
		//Clock Hours Hand
		this.scene.pushMatrix();

			this.scene.rotate(this.clockHourHand.angle * deg2Rad , 0 , 0, 1);
			this.clockHourHand.display();
		this.scene.popMatrix();
	};

	update(currTime){
		
		var secAng;
		if(this.lastCurrTime == -1){

			this.lastCurrTime = currTime;
			secAng = 360/(60);  // angulo para 1 segundo;;
		} else{

			var deltaTime = currTime - this.lastCurrTime;
			this.lastCurrTime = currTime;
			secAng = deltaTime * 0.006;

		}
		
		this.clockSecHand.setAngle(this.clockSecHand.angle  - secAng);
		this.clockMinHand.setAngle(this.clockMinHand.angle - secAng / 60);
		this.clockHourHand.setAngle(this.clockHourHand.angle - secAng / 3600);
	};
};