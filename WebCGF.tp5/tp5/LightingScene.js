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
		this.table = new MyTable(this);
		this.leftwall = new MyQuad(this, -0.5, 1.5 , 1.5, -0.5);
		this.planeWall = new MyQuad(this);
		this.floor = new MyQuad(this ,0 , 10 , 0 ,12);
		this.chair = new MyChair(this);
		this.clock = new MyClock(this, 12);
		this.clockSecondHand = new MyClockHand(this, 0);
		this.clockMinuteHand = new MyClockHand(this, 0);
		this.clockHourHand = new MyClockHand(this, 0);
		
		this.boardA = new Plane(this, BOARD_A_DIVISIONS);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS);

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
		//this.materialA.setSpecular(0.2,0.2,0.2,1);
		this.madeira.setSpecular(0,0.1,0.2,1);	
		//this.materialA.setShininess(10);
		this.madeira.setShininess(120);

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


		this.tableAppearance = new CGFappearance(this);
		this.tableAppearance.setSpecular(0.1,0.1,0.1,1);
		this.tableAppearance.setShininess(1);
		this.tableAppearance.setAmbient(0.66,0.66,0.66,1);
		this.tableAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.tableAppearance.loadTexture("../resources/images/table.png");


		this.floorAppearance = new CGFappearance(this);
		this.floorAppearance.setSpecular(0.1,0.1,0.1,1);
		this.floorAppearance.setShininess(1);
		this.floorAppearance.setAmbient(0.66,0.66,0.66,1);
		this.floorAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.floorAppearance.loadTexture("../resources/images/floor.png");


		this.windowAppearance = new CGFappearance(this);
		this.windowAppearance.setSpecular(0.1,0.1,0.1,1);
		this.windowAppearance.setShininess(1);
		this.windowAppearance.setAmbient(0.66,0.66,0.66,1);
		this.windowAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

		
		this.slidesAppearance =  new CGFappearance(this);
		this.slidesAppearance.setAmbient(0.2,0.2,0.2,1);
		this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
		this.slidesAppearance.setShininess(1);
		this.slidesAppearance.loadTexture("../resources/images/slides.png");
		//this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		
		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.setAmbient(0.2,0.2,0.2,1);
		this.boardAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.boardAppearance.setSpecular(0.1,0.1,0.1,1);
		this.boardAppearance.setShininess(1);
		this.boardAppearance.loadTexture("../resources/images/board.png");

		this.clockAppearance = new CGFappearance(this);
		this.clockAppearance.setAmbient(0.2,0.2,0.2,1);
		this.clockAppearance.setDiffuse(0.8,0.8,0.8,1);
		this.clockAppearance.setSpecular(0.1,0.1,0.1,1);
		this.clockAppearance.setShininess(1);
		this.clockAppearance.loadTexture("../resources/images/clock.png");

		this.setUpdatePeriod(100);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		this.setGlobalAmbientLight(0.0, 0.0, 0.0, 0.0);
		
		// Positions for four lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		
		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)

		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[4].setPosition(15, 3.0, 5.0, 1.0);
		this.lights[4].setVisible(true); // show marker on light position (different from enabled)


		this.lights[0].setSpecular(1, 1, 0, 1);
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

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
	}


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
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);
			this.floorAppearance.apply();
			this.floor.display();
		this.popMatrix();

		// Plane Wall
		this.metalic.apply();
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);
			this.planeWall.display();
		this.popMatrix();
		
		// Left Wall
		this.wallmaterial.apply();
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);
			this.windowAppearance.apply();
			this.leftwall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 5);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 5);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			
			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			
			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();

		// First Chair
		this.pushMatrix();
			this.translate(5, -.7, 7);
			this.chair.display();
		this.popMatrix();

		// Second Chair
		this.pushMatrix();
			this.translate(12, -.7, 7);
			this.chair.display();
		this.popMatrix();

		// Third Chair
		this.pushMatrix();
			this.deg2rad=Math.PI/180.0;
        	var a_rad = 180.0 * this.deg2rad;
        	this.rotate(a_rad, 0, 1, 0);
			this.translate(-5, -.7, -3);
			this.chair.display();
		this.popMatrix();

		// Fourth Chair
		this.pushMatrix();
			this.deg2rad=Math.PI/180.0;
        	var a_rad = 180.0 * this.deg2rad;
        	this.rotate(a_rad, 0, 1, 0);
			this.translate(-12, -.7, -3);
			this.chair.display();
		this.popMatrix();

		//Clock
		this.pushMatrix();
			this.clock.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};

	update(currTime){
		this.clock.update(currTime);
	};
};
