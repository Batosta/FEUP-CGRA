/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks)
    {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
    };

	initBuffers() 
	{
		this.vertices = [
				];

		this.indices = [
			];
		
		this.normals = [
		];


		var sum = 0.0;
		var increase = 1.0 / this.stacks;

		var rotAngle = 0;
		var ang = 2 * Math.PI / this.slices;
		
	    for(var i = 0; i < this.stacks; i+= increase){
				
				for(var k = 0; k < this.slices; k++){

	 
	    			this.vertices.push(Math.cos(k*ang), Math.sin(k*ang), i);
					
		    		this.normals.push(Math.cos(k*ang), Math.sin(k*ang), 0);
				}
				
				sum = 0;
	    }
	    
	    for(var k = 0; k < this.stacks; k++){
			for ( var i = 0; i < this.slices - 1; i++){ //slides
				this.indices.push(i + k*this.slices, i + k*this.slices+1, i + k*this.slices+this.slices,
								i + k*this.slices+this.slices+1, i + k*this.slices+this.slices, i + k*this.slices+1);
				if(i == this.slices - 2){
					this.indices.push(i + k*this.slices+1, 0, i + k*this.slices+this.slices + 1, k*this.slices+this.slices, i + k*this.slices+this.slices + 1, 0);
				}
			}
		}
		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};