var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene 
{
	constructor()
	{
	
		super();
	};	

	init(application) 
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.enableTextures(true);

		this.axis = new CGFaxis(this);

		// Scene elements

		this.vehicle = new MyVehicle(this);

		this.altimetry= [[ 12.0 , 9.0 , 8.0, 4.0, 2.5, 2.4, 2.3, 1.3, 0.0],
						 [ 8.0 , 7.0 , 8.0, 4.0, 7.5, 6.4, 4.3, 1.3, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                         [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
						 [ 2.0 , 3.0 , 2.0, 1.0, 2.5, 2.4, 2.3, 1.3, 0.0]
		];

		

		this.terrain = new MyTerrain(this, this.altimetry[0].length -1 , this.altimetry);

		this.sky = new MySky(this);

		this.crane = new MyCrane(this);

		this.spot = new MyQuad(this);


		 // gui 
		this.Light1=true;
		this.Light2=true;
		this.Light3=true;
		this.speed=3;
		this.showaxis = false;

		
		this.lastTime = 0;


		/*this.table = new MyTable(this);
		this.leftwall = new MyQuad(this, -0.5, 1.5 , 1.5, -0.5);

		this.boardA = new Plane(this, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);*/




		// Materials
		this.materialDefault = new CGFappearance(this);
		
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		//this.materialA.setSpecular(0.2,0.2,0.2,1);
		this.materialA.setSpecular(0,0.2,0.8,1);	
		//this.materialA.setShininess(10);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0.8,0.8,0.8,1);	
		this.materialB.setShininess(120);

		this.madeira = new CGFappearance(this);
		this.madeira.setAmbient(0.3,0.3,0.3,1);
		this.madeira.setDiffuse(0.34,0.18,0.06,1);
		this.madeira.setSpecular(0,0.1,0.2,1);
		this.madeira.setShininess(120);

		this.black = new CGFappearance(this);
		this.black.setAmbient(0.3,0.3,0.3,1);
		this.black.setDiffuse(0, 0, 0, 1);
		this.black.setSpecular(0,0.1,0.2,1);
		this.black.setShininess(120);

		this.metalic = new CGFappearance(this);
		this.metalic.setAmbient(0.66,0.66,0.66,1);
		this.metalic.setDiffuse(0.66,0.66,0.66,1);
		//this.materialA.setSpecular(0.2,0.2,0.2,1);
		this.metalic.setSpecular(1,1,1,1);	
		//this.materialA.setShininess(10);
		this.metalic.setShininess(120);

		this.floormaterial = new CGFappearance(this);
		this.floormaterial.setAmbient(0.9,0,0,1);
		this.floormaterial.setDiffuse(0.9,0,0,1);
		//this.materialA.setSpecular(0.2,0.2,0.2,1);
		this.floormaterial.setSpecular(1,1,1,1);	
		//this.materialA.setShininess(10);
		this.floormaterial.setShininess(120);

		this.wallmaterial = new CGFappearance(this);
		this.wallmaterial.setAmbient(1,1,1,1);
		this.wallmaterial.setDiffuse(1,1,1,1);
		//this.materialA.setSpecular(0.2,0.2,0.2,1);
		this.wallmaterial.setSpecular(1,1,1,1);	
		//this.materialA.setShininess(10);
		this.wallmaterial.setShininess(120);

		this.rimAppearance = new CGFappearance(this);
		this.rimAppearance.setAmbient(0.2,0.2,0.2,1);
		this.rimAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.rimAppearance.setSpecular(0.1,0.1,0.1,1);
		this.rimAppearance.setShininess(1);
		this.rimAppearance.loadTexture("../resources/images/rim.png");
		//this.rimAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

		this.grassAppearance = new CGFappearance(this);
		this.grassAppearance.setAmbient(0.2,0.2,0.2,1);
		this.grassAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.grassAppearance.setSpecular(0.1,0.1,0.1,1);
		this.grassAppearance.setShininess(1);
		this.grassAppearance.loadTexture("../resources/images/grass.jpg");

      	this.skyAppearance = new CGFappearance(this);
		this.skyAppearance.setAmbient(0.2,0.2,0.2,1);
		this.skyAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.skyAppearance.setSpecular(0.1,0.1,0.1,1);
		this.skyAppearance.setShininess(1);
		this.skyAppearance.loadTexture("../resources/images/sky.jpg");

		this.tireAppearance = new CGFappearance(this);
		this.tireAppearance.setAmbient(0.8,0.8,0.8,1);
		this.tireAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.tireAppearance.setSpecular(0.1,0.1,0.1,1);
		this.tireAppearance.setShininess(1);
		this.tireAppearance.loadTexture("../resources/images/tire.jpg");

		this.entryAppearance = new CGFappearance(this);
		this.entryAppearance.setAmbient(0.8,0.8,0.8,1);
		this.entryAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.entryAppearance.setSpecular(0.1,0.1,0.1,1);
		this.entryAppearance.setShininess(1);
		this.entryAppearance.loadTexture("../resources/images/entry.jpg");

		this.exitAppearance = new CGFappearance(this);
		this.exitAppearance.setAmbient(0.8,0.8,0.8,1);
		this.exitAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.exitAppearance.setSpecular(0.1,0.1,0.1,1);
		this.exitAppearance.setShininess(1);
		this.exitAppearance.loadTexture("../resources/images/exit.jpg");

		this.FerrugemText = new CGFappearance(this);
		this.FerrugemText.setAmbient(0.2,0.2,0.2,1);
		this.FerrugemText.setDiffuse(0.8,0.8,0.8,1);
		this.FerrugemText.setSpecular(0.1,0.1,0.1,1);
		this.FerrugemText.setShininess(1);
		this.FerrugemText.loadTexture("../resources/images/ferrugem.jpg");

		this.WoodText = new CGFappearance(this);
		this.WoodText.setAmbient(0.2,0.2,0.2,1);
		this.WoodText.setDiffuse(0.8,0.8,0.8,1);
		this.WoodText.setSpecular(0.1,0.1,0.1,1);
		this.WoodText.setShininess(1);
		this.WoodText.loadTexture("../resources/images/wood.jpg");

		this.carText1 = new CGFappearance(this);
		this.carText1.setAmbient(0.2,0.2,0.2,1);
		this.carText1.setDiffuse(0.8,0.8,0.8,1);
		this.carText1.setSpecular(0.1,0.1,0.1,1);
		this.carText1.setShininess(1);
		this.carText1.loadTexture("../resources/images/piso1.jpg");

		this.dogs = new CGFappearance(this);
		this.dogs.setAmbient(0.8,0.8,0.8,1);
		this.dogs.setDiffuse(0.8,0.8,0.8,1);
		this.dogs.setSpecular(0.1,0.1,0.1,1);
		this.dogs.setShininess(1);
		this.dogs.loadTexture("../resources/images/dogs.jpg");

		this.dogs1 = new CGFappearance(this);
		this.dogs1.setAmbient(0.8,0.8,0.8,1);
		this.dogs1.setDiffuse(0.8,0.8,0.8,1);
		this.dogs1.setSpecular(0.1,0.1,0.1,1);
		this.dogs1.setShininess(1);
		this.dogs1.loadTexture("../resources/images/dogs1.jpg");

		this.dogs2 = new CGFappearance(this);
		this.dogs2.setAmbient(0.8,0.8,0.8,1);
		this.dogs2.setDiffuse(0.8,0.8,0.8,1);
		this.dogs2.setSpecular(0.1,0.1,0.1,1);
		this.dogs2.setShininess(0);
		this.dogs2.loadTexture("../resources/images/dogs2.jpg");

		this.optimusPrime = new CGFappearance(this);
		this.optimusPrime.setAmbient(0.8,0.8,0.8,1);
		this.optimusPrime.setDiffuse(0.8,0.8,0.8,1);
		this.optimusPrime.setSpecular(0.1,0.1,0.1,1);
		this.optimusPrime.setShininess(0);
		this.optimusPrime.loadTexture("../resources/images/optimus.jpg");

		this.engine = new CGFappearance(this);
		this.engine.setAmbient(0.8,0.8,0.8,1);
		this.engine.setDiffuse(0.8,0.8,0.8,1);
		this.engine.setSpecular(0.1,0.1,0.1,1);
		this.engine.setShininess(0);
		this.engine.loadTexture("../resources/images/engine.png");
		
		this.reggae = new CGFappearance(this);
		this.reggae.setAmbient(0.8,0.8,0.8,1);
		this.reggae.setDiffuse(0.8,0.8,0.8,1);
		this.reggae.setSpecular(0.1,0.1,0.1,1);
		this.reggae.setShininess(0);
		this.reggae.loadTexture("../resources/images/reggae.jpg");

		this.race = new CGFappearance(this);
		this.race.setAmbient(0.8,0.8,0.8,1);
		this.race.setDiffuse(0.8,0.8,0.8,1);
		this.race.setSpecular(0.1,0.1,0.1,1);
		this.race.setShininess(0);
		this.race.loadTexture("../resources/images/race.png");


		this.oldSkin = [this.WoodText , this.FerrugemText ,  this.carText1];
		this.randomSkin = [this.madeira , this.metalic , this.floormaterial];
		this.transformerSkin = [this.engine, this.optimusPrime, this.optimusPrime];
		this.reggaeRaceSkin = [this.race, this.reggae, this.race];

		this.vehicleAppearances = [this.oldSkin, this.randomSkin, this.transformerSkin, this.reggaeRaceSkin];
		this.vehicleAppearanceList =  {OldTruck : 0, Random : 1, OptimusPrime : 2, ReggaeRace : 3};
		this.currVehicleAppearance = 0;


		this.setUpdatePeriod(30);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(1, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
		
		// Positions for four lights
		this.lights[0].setPosition(4, 10, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setPosition(10.5, 10.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 10.0, 5.0, 1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 10.0, 5.0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[4].setPosition(15, 10.0, 5.0, 1.0);
		this.lights[4].setVisible(true); // show marker on light position (different from enabled)


		this.lights[0].setSpecular(1, 1, 0, 1);
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		//this.lights[1].enable();

		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].setSpecular(1, 1, 1, 1);
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].enable();

		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0);
		this.lights[3].setQuadraticAttenuation(1.0);
		this.lights[3].setSpecular(1, 1, 0, 1);
		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].enable();

		this.lights[4].setConstantAttenuation(0);
		this.lights[4].setLinearAttenuation(0);
		this.lights[4].setQuadraticAttenuation(1.0);
		this.lights[4].setSpecular(1, 1, 1, 1);
		this.lights[4].setAmbient(1, 1, 1, 1);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();

		if (this.Light1){
			this.lights[2].enable();
		}
		else this.lights[2].disable();

		if (this.Light2){
			this.lights[3].enable();
		}

		else this.lights[3].disable();

		if (this.Light3){
			this.lights[4].enable();
		}

		else this.lights[4].disable();
	}

	update(currTime){
		if (this.lastTime > 0 ){

			if(this.crane.activateCrane){
				
				if(!this.crane.carCought){
					
					this.crane.getCar();
				} else if (!this.crane.carUp){
					
					this.crane.upCar();
				} else if (!this.crane.rotated){

					this.crane.rotateCraneCar();
				} else{

					this.crane.rotated = 0;
					this.crane.carUp = 0;
					this.crane.carCought = 0;
					this.crane.activateCrane = 0;
					this.crane.completed = 1;
					this.vehicle.Xpos = 20;
					this.vehicle.Ypos = 4;
					this.vehicle.Zpos = 0;
				}
			} else {

				if(this.crane.completed){
					this.crane.returnToD();
					this.vehicle.fall();
				}

				this.vehicle.update(currTime - this.lastTime);
			}
		}
		this.lastTime = currTime;
	};

	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.showaxis){
			this.axis.display();
		}
 
		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		//translate
        //rotate
        //scale


//Vehicle
		this.pushMatrix(); 
			
			this.translate(0, 0.8, 0);
			

			if(!this.crane.carCought)
				this.vehicle.display();

		this.popMatrix();
		//Updates activateCrane
		this.crane.carAboveEntry(this.vehicle.getXPosition(), this.vehicle.getZPosition(), this.vehicle.getSpeed());

		//Sky
		this.pushMatrix();

			this.skyAppearance.apply();
			this.scale(50, 50, 50);
			this.sky.display();

		this.popMatrix();


		//Terrain
		this.pushMatrix();

		   	this.terrain.display();
			
		this.popMatrix();
		
		
		//Crane
		this.pushMatrix();

			this.rotate(90*degToRad, 0, 1, 0);
			this.crane.display();
			
		this.popMatrix();


		//Floor spots
		this.pushMatrix();

			this.exitAppearance.apply();
			this.translate(21, 0.01, 0);
			this.rotate(270 * degToRad, 1, 0, 0);
			this.scale(7, 7, 1);
			this.spot.display();

			this.entryAppearance.apply();
			this.translate(-6, 0, 0);
			this.spot.display();

		this.popMatrix();
        

		// ---- END Scene drawing section
	};

	showAxis(){
		if(this.showaxis){
			this.showaxis = false;
		}
		else this.showaxis = true;
	};

	checkKeys(){

		var text="Keys pressed: ";
		var keysPressed=false;

		if (this.gui.isKeyPressed("KeyW")){
			text+=" W ";
			keysPressed=true;
		}
		if (this.gui.isKeyPressed("KeyS")){
			text+=" S ";
			keysPressed=true;
		}

		if (keysPressed)
			console.log(text);
	};		
};
