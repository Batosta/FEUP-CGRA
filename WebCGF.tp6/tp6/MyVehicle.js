  /**
 * MyVehicle
 *
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI / 180.0;

class MyVehicle extends CGFobject
{
	constructor(scene)
    {
    	super(scene);

      this.carSpeed = 0;
      this.carAcceleration = 0;

      this.maxSpeed = 20;
      this.minSpeed = -20;

      this.Xpos = 0;
      this.Ypos = 0;
      this.Zpos = 0;
      this.ori = 0;
      this.rotationAng = 5;

      this.wheelRotationAng = 0.0;
      this.wheelRadius = 0.5;
      this.wheelRotationAngYY = this.wheelRotationAng;



	  this.wheel = new MyWheel(this.scene);
      this.chassi1 = new MyUnitCubeQuad(this.scene);
      this.chassi2 = new MyUnitCubeQuad(this.scene);
      this.engine = new MyUnitCubeQuad(this.scene);
      this.light = new MyLamp(this.scene, 50, 10);
      this.trapezium = new MyTrapezium(this.scene, 2, 3.5, .5);
      this.window = new MyQuad(this.scene);
    };

	display(){
		
        //translate
        //rotate
        //scale
		
		/*	Comprimento: entre 4.0 e 5.0 unidades
			Distância entre eixos: entre 2.0 e 3.5 unidades
			Diâmetro das rodas: entre 0.7 e 1.1 unidades
			Largura: entre 1.8 e 2.5 unidades
			Altura: entre 1.2 e 2.0 unidades  */
        
        this.scene.pushMatrix();
        this.scene.translate(this.Xpos , this.Ypos , this.Zpos);
        this.scene.rotate(this.ori*degToRad, 0, 1,0);
     

//Chassis        	
        //Engine
        this.scene.pushMatrix();
            this.scene.vehicleAppearances[this.scene.currVehicleAppearance][0].apply();
            this.scene.scale(3.5, 0.8, 2.5);
            this.engine.display();
        this.scene.popMatrix();

        //Right Trapezium
        this.scene.pushMatrix();
			     this.scene.vehicleAppearances[this.scene.currVehicleAppearance][1].apply();
			     this.scene.translate(0, 0.65, 1.25);
			  this.trapezium.display();
           	
           	var a_rad = 180.0 * this.deg2rad;
          	this.scene.rotate(a_rad, 0, 1, 0);
			  this.trapezium.display();

        this.scene.popMatrix();

		//Left Trapezium
		this.scene.pushMatrix();
			
			this.scene.translate(0, 0.65, -1.25);
			this.trapezium.display();
           	
           	var a_rad = 180.0 * this.deg2rad;
          	this.scene.rotate(a_rad, 0, 1, 0);
			this.trapezium.display();

        this.scene.popMatrix();
       
		//Back Trapezium
		this.scene.pushMatrix();
			
			this.scene.translate(-1.75, 0.65, 0);

			var a_rad = -90.0 * this.deg2rad;
          	this.scene.rotate(a_rad, 0, 1, 0);
          	this.scene.scale(0.715, 1, 1);
			this.trapezium.display();

			a_rad = 180.0 * this.deg2rad;
          	this.scene.rotate(a_rad, 0, 1, 0);
			this.trapezium.display();

        this.scene.popMatrix();

        //Down Chassi
        this.scene.pushMatrix();
            this.scene.vehicleAppearances[this.scene.currVehicleAppearance][2].apply();
            this.scene.translate(2.5, 0.1, 0);
            this.scene.scale(1.5, 1, 2.5);
            this.chassi1.display();
        this.scene.popMatrix();

        //Up Chassi
        this.scene.pushMatrix();
            this.scene.vehicleAppearances[this.scene.currVehicleAppearance][2].apply();
            this.scene.translate(2.45, 1.1, 0);
            this.scene.scale(1.4, 1, 2.5);
            this.chassi2.display();
        this.scene.popMatrix();

//Wheels
        this.scene.pushMatrix();

        this.wheel.setAng(this.wheelRotationAng);
        
        //Left Back Wheel
        this.scene.pushMatrix();
            this.scene.translate(-1, -.3, -1.4);
            this.wheel.display();
        this.scene.popMatrix();

        //Right Back Wheel
        this.scene.pushMatrix();
            this.scene.translate(-1, -.3, 0.9);
            this.wheel.display();
        this.scene.popMatrix();

        //Left Front Wheel
        this.scene.pushMatrix();

            this.scene.translate(2.4, -.3, -1.4);
			var a_rad = this.wheelRotationAngYY * this.deg2rad;
			this.scene.rotate(a_rad, 0, 1, 0);
            this.wheel.display();

        this.scene.popMatrix();

        //Right Front Wheel
        this.scene.pushMatrix();
            
            this.scene.translate(2.4, -.3, 0.9);
           	var a_rad = this.wheelRotationAngYY * this.deg2rad;
			this.scene.rotate(a_rad, 0, 1, 0);
            this.wheel.display();
            
        this.scene.popMatrix();

        this.scene.popMatrix();

//Lights
        this.deg2rad=Math.PI/180.0;
		//Left Back Light
        this.scene.pushMatrix();
           this.scene.translate(-1.75, 0, -.9);
           var a_rad = 270.0 * this.deg2rad;
           this.scene.rotate(a_rad, 0, 1, 0);
           this.scene.scale(.2, .2, .2);
           this.light.display();
        this.scene.popMatrix();

        //Right Back Light
        this.scene.pushMatrix();
           this.scene.translate(-1.75, 0, .9);
           var a_rad = 270.0 * this.deg2rad;
           this.scene.rotate(a_rad, 0, 1, 0);
           this.scene.scale(.2, .2, .2);
           this.light.display();
        this.scene.popMatrix();

        //Left Front Light
        this.scene.pushMatrix();
           this.scene.translate(3.25, 0, -.9);
           var a_rad = 90.0 * this.deg2rad;
           this.scene.rotate(a_rad, 0, 1, 0);
           this.scene.scale(.2, .2, .2);
           this.light.display();
        this.scene.popMatrix();

        //Right Front Light
        this.scene.pushMatrix();
           this.scene.translate(3.25, 0, .9);
           var a_rad = 90.0 * this.deg2rad;
           this.scene.rotate(a_rad, 0, 1, 0);
           this.scene.scale(.2, .2, .2);
           this.light.display();
        this.scene.popMatrix();

	    //translate
        //rotate
        //scale

//Windows
		//Front window
		this.scene.pushMatrix();
			
			this.scene.dogs.apply();
			this.scene.translate(3.15, 1.1, 0);
			this.scene.rotate(90*degToRad, 0, 1, 0);
			this.scene.scale(2.5, 1, 1);
			this.window.display();

		this.scene.popMatrix();

		//Right window
		this.scene.pushMatrix();

			this.scene.dogs1.apply();
			this.scene.translate(2.45, 1.1, 1.255);
			this.scene.scale(1.4, 1, 1);
			this.window.display();

		this.scene.popMatrix();

		//Left window
		this.scene.pushMatrix();

			this.scene.dogs2.apply();
			this.scene.rotate(180*degToRad, 0, 1, 0);
			this.scene.translate(-2.45, 1.1, 1.255);
			this.scene.scale(1.4, 1, 1);
			this.window.display();

		this.scene.popMatrix();

        this.scene.popMatrix();
	};

	isValidPos(x , z){
 
     
     // new
     //
     
     let div = this.scene.altimetry[0].length -1
     let xPosTerrain = Math.round((x/50.0)/(1.0/(div))) ;
     let zPosTerrain = Math.round((z/50.0)/(1.0/(div)));
 
     console.log(xPosTerrain , zPosTerrain , "x = " + x , "z = " + z);
     console.log(Math.round(-4.0496));
     if (xPosTerrain >= div || zPosTerrain >= div || xPosTerrain < 0 || zPosTerrain < 0)
      return false;
 
    let xAux = ((x/50.0)% (1.0/div))/(1.0/div);
    let zAux = ((z/50.0)% (1.0/div))/(1.0/div);
 
    let first = this.scene.altimetry[xPosTerrain][zPosTerrain];
    let second = this.scene.altimetry[xPosTerrain +1 ][zPosTerrain];
    let third = this.scene.altimetry[xPosTerrain][zPosTerrain + 1];
    let fourth = this.scene.altimetry[xPosTerrain + 1][zPosTerrain + 1];
   
    console.log ("alt : " , first , second , third , fourth);
    let helper = (first *  (1 - xAux) - second * xAux);
    let helper1 = (third *  (1 - xAux) - fourth * xAux);
 
    console.log("altimetry = " + (helper * (1 - xAux) + helper1 * zAux));
    if ((helper * (1 - xAux) + helper1 * zAux) == 0)
      return true;
 
    else return false;
 
 
  };

  update(deltaTime){


    if (this.scene.gui.isKeyPressed("KeyW") ){
        this.carAcceleration = 1;
        if (this.scene.gui.isKeyPressed("KeyA")){
            if(this.carSpeed != 0){
                this.ori += this.rotationAng;
                this.wheelRotationAngYY += this.carSpeed * (deltaTime/500.0);
            }
        }
        else if (this.scene.gui.isKeyPressed("KeyD")){
            if(this.carSpeed != 0){
                this.ori -= this.rotationAng;
             	this.wheelRotationAngYY -= this.carSpeed * (deltaTime/500.0);
            }
        } else{

			if(this.wheelRotationAngYY > 0)
        		this.wheelRotationAngYY -= 2 * this.carSpeed * (deltaTime/500.0);
        	else if(this.wheelRotationAngYY < 0)
        		this.wheelRotationAngYY += 2 * this.carSpeed * (deltaTime/500.0);
        }
    }
    else if (this.scene.gui.isKeyPressed("KeyS")){
        this.carAcceleration = -1;
        if (this.scene.gui.isKeyPressed("KeyA")){
            if(this.carSpeed != 0){
                this.ori += this.rotationAng;
             	this.wheelRotationAngYY += this.carSpeed * (deltaTime/500.0);
            }
        }
        else if (this.scene.gui.isKeyPressed("KeyD")){
            if(this.carSpeed != 0){
                this.ori -= this.rotationAng;
                this.wheelRotationAngYY -= this.carSpeed * (deltaTime/500.0);
            }
        } else{

			if(this.wheelRotationAngYY > 0)
        		this.wheelRotationAngYY += 2 * this.carSpeed * (deltaTime/500.0);
        	else if(this.wheelRotationAngYY < 0)
        		this.wheelRotationAngYY -= 2 * this.carSpeed * (deltaTime/500.0);
        }
    }
    else if (this.scene.gui.isKeyPressed("KeyA")){
      if(this.carSpeed != 0){
        if (this.carSpeed > 0 )
        this.carAcceleration = -0.5;
        else this.carAcceleration = 0.5;
        this.ori += this.rotationAng;
        this.wheelRotationAngYY += this.carSpeed * (deltaTime/500.0);
      } else{
      	this.wheelRotationAngYY += deltaTime/50.0;
      }
    }
    else if (this.scene.gui.isKeyPressed("KeyD")){
      if(this.carSpeed != 0){
        if (this.carSpeed > 0 )
        this.carAcceleration = -0.5;
        else this.carAcceleration = 0.5;
        this.ori -= this.rotationAng;
        this.wheelRotationAngYY -= this.carSpeed * (deltaTime/500.0);
      } else{
      	this.wheelRotationAngYY -= deltaTime/50.0;
      }
    }
    else {
      if (this.carSpeed == 0){
          this.carAcceleration = 0;
        }
      else if (this.carSpeed > 0 ){
        this.carAcceleration = -0.5;
      }
      else this.carAcceleration = 0.5;
    }


    if ((this.carSpeed + this.carAcceleration )> this.maxSpeed || (this.carSpeed + this.carAcceleration ) < this.minSpeed){
      if ((!(this.carSpeed + this.carAcceleration) == this.maxSpeed) && (!(this.carSpeed + this.carAcceleration) == this.minSpeed))
        this.carSpeed -= this.carAcceleration;
    }
    

    else {
      this.carSpeed += this.carAcceleration;
    }
    

    this.Xpos += this.carSpeed*(deltaTime/1000.0)*Math.cos(this.ori * degToRad);

    this.Zpos -= this.carSpeed * (deltaTime/1000.0)*Math.sin(this.ori * degToRad);

	/*if (this.isValidPos(this.Xpos , this.Zpos)){
      
    	this.Xpos -= this.carSpeed*(deltaTime/1000.0)*Math.cos(this.ori * degToRad);
 
    	this.Zpos += this.carSpeed * (deltaTime/1000.0)*Math.sin(this.ori * degToRad);
    }*/

    this.wheelRotationAng += this.carSpeed * (deltaTime / 500.0) * this.wheelRadius;

	if(this.wheelRotationAngYY > 30)
		this.wheelRotationAngYY = 30;
	else if(this.wheelRotationAngYY < -30)
		this.wheelRotationAngYY = -30;
    };


    getXPosition(){

    	return this.Xpos;
    };

	getZPosition(){

    	return this.Zpos;
    };

    getSpeed(){
    	return this.carSpeed;
    };
    
	 fall(){

		if(this.Ypos > 0){
			this.Ypos -= 0.5;
		}
  }
   
};