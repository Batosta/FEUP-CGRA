/**
 * MyCrane
 *
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI / 180.0;

class MyCrane extends CGFobject
{
	constructor(scene)
    {
		
		super(scene);

		this.articulation = new MyCylinder(this.scene, 25, 5);
		this.articulationCover = new MyCircle(this.scene, 20);

      	this.arm = new MyCraneArm(this.scene);
      	this.airArm = new MyCraneArm(this.scene);

      	this.imanArm = new MyPrism(this.scene, 4, 20);
      	this.iman = new MyPrism(this.scene, 20, 10);
      	this.imanCover = new MyCircle(this.scene, 20);
      	this.vehicle = new MyVehicle(this.scene);

      	this.craneAngle = 0.0;
      	this.craneAirArmAngle = 0.0;

      	this.activateCrane = 0;			//Flag
      	this.carCought = 0;				//Crane has car
      	this.carUp = 0;					//Car has been fully lifted
      	this.rotated = 0;				//Crane has finished the YY rotation
      	this.completed = 0;				//The whole movement is complete 
    };

	display(){

	    //translate
        //rotate
        //scale


		this.scene.pushMatrix();
        	
        	this.scene.rotate(this.craneAngle * degToRad, 0, 1, 0);

			//Base        	
        	this.scene.pushMatrix();

            	this.scene.metalic.apply();
            	this.scene.translate(0, 1, 0);
            	this.scene.scale(2, 1, 2);
          		this.scene.rotate(90.0 * degToRad, 1, 0, 0);
            	this.articulation.display();

            	this.scene.rotate(-180.0 * degToRad, 1, 0, 0);
            	this.articulationCover.display();

        	this.scene.popMatrix();


        	//Base Arm
        	this.scene.pushMatrix();
            
            	this.scene.rotate(30.0 * degToRad, 1, 0, 0);
           		this.scene.translate(0, -1, 0);
            	this.scene.rotate(-90.0 * degToRad, 1, 0, 0);
            	this.arm.display();

        	this.scene.popMatrix();


        	//Articulation
        	this.scene.pushMatrix();

            	this.scene.translate(-1, 12, 7);
            	this.scene.scale(2, 1, 1);
          		this.scene.rotate(90 * degToRad, 0, 1, 0);
            	this.articulation.display();

           		this.scene.rotate(-180.0 * degToRad, 1, 0, 0);
            	this.articulationCover.display();

            	this.scene.translate(0, 0, -1);
            	this.scene.rotate(-180.0 * degToRad, 1, 0, 0);
            	this.articulationCover.display();

        	this.scene.popMatrix();
        

        	//Air Arm
        	this.scene.pushMatrix();

             	this.scene.translate(0, 12, 7.5);
				this.scene.rotate(this.craneAirArmAngle * degToRad, 1, 0, 0);            
            	this.airArm.display();

	        this.scene.popMatrix();

       

       		//Iman
        	this.scene.pushMatrix();
            
          		this.scene.translate(0, 12 + 15*Math.sin(-this.craneAirArmAngle * degToRad), 7.5 + 15*Math.cos(-this.craneAirArmAngle * degToRad));
            	this.scene.rotate(90.0 * degToRad, 1, 0, 0);
            	this.scene.scale(0.1, 0.1, 5);
            	this.imanArm.display();

				this.scene.translate(0, 0, 0.9);
				this.scene.scale(20, 20, 0.2);
            	this.iman.display();

				this.scene.rotate(180.0 * degToRad, 0, 1, 0);
    	        this.imanCover.display();

        	    this.scene.rotate(180.0 * degToRad, 0, 1, 0);
            	this.scene.translate(0, 0, 1);
            	this.imanCover.display();

	        this.scene.popMatrix();

			//Car
			if(this.carCought){
	        	this.scene.pushMatrix();

                	this.scene.translate(0, 4.9 + 15*Math.sin(-this.craneAirArmAngle * degToRad), 7.5 + 15*Math.cos(-this.craneAirArmAngle * degToRad));
                	this.vehicle.display();

            	this.scene.popMatrix();
			}
        this.scene.popMatrix();
	};

	setCraneAngle(angle){

		this.craneAngle = angle;
	}

	setCraneAirArmAngle(angle){

		this.craneAirArmAngle = angle;
	}

	//Pos Here = (0, 0.01, -29)
	//Pos Exit = (0, 0.01, 29) 
	//Size = 7.0
	carAboveEntry(carX, carZ , carSpeed){

		if((carZ > -3.5) && (carZ < 3.5) && (carX < -17.5) && (carX > -24.5) && (carSpeed == 0)){

			this.activateCrane = 1;
		} else{

			this.activateCrane = 0;
		}
	}

	getCar(){

		if(this.craneAngle > -180)
			this.setCraneAngle(this.craneAngle - 1);
		else if(this.craneAirArmAngle < 16.0)
			this.setCraneAirArmAngle(this.craneAirArmAngle + 0.5);
		else
			this.carCought = 1;
	}

	upCar(){

		if(this.craneAirArmAngle > 0.0)
			this.setCraneAirArmAngle(this.craneAirArmAngle - 0.5);
		else
			this.carUp = 1;
	}

	rotateCraneCar(){

		if(this.craneAngle < 0)
			this.setCraneAngle(this.craneAngle + 1);
		else{
			this.rotated = 1;
		}
	}

	returnToD(){

		if(this.craneAngle > -180)
			this.setCraneAngle(this.craneAngle - 1);
		else
			this.completed = 0;
	}
};