/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends Plane
{
	constructor(scene , nrDiv , altimetry)
	{
		super(scene,nrDiv , altimetry);
		//this.initBuffers();
	};

	display(){
		this.scene.pushMatrix();
			this.scene.grassAppearance.apply();
			this.deg2rad=Math.PI/180.0;
			var a_rad = -90.0 * this.deg2rad;
        	this.scene.rotate(a_rad, 1, 0, 0);
        	this.scene.scale(50, 50, 1);
			CGFobject.prototype.display.call(this);
		this.scene.popMatrix();

		
	};
	   
		
};