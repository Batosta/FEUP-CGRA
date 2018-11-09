/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
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

		var indiceIncrement = 0;
		
	    for(var i = 0; i < this.slices; i++){
				
				for(var k = 0; k < this.stacks; k++){

	    			this.vertices.push(Math.cos(rotAngle), Math.sin(rotAngle), sum);
	    			this.vertices.push(Math.cos(rotAngle + ang), Math.sin(rotAngle + ang), sum);
	    			this.vertices.push(Math.cos(rotAngle), Math.sin(rotAngle), sum + increase);
	    			this.vertices.push(Math.cos(rotAngle + ang), Math.sin(rotAngle + ang), sum + increase);

					this.indices.push(1 + indiceIncrement, 3 + indiceIncrement, 2 + indiceIncrement);
					this.indices.push(1 + indiceIncrement, 2 + indiceIncrement, 0 + indiceIncrement);
					
	    			this.normals.push(Math.cos(rotAngle), Math.sin(rotAngle), 0);
	    			this.normals.push(Math.cos(rotAngle), Math.sin(rotAngle), 0);
		    		this.normals.push(Math.cos(rotAngle), Math.sin(rotAngle), 0);
		    		this.normals.push(Math.cos(rotAngle), Math.sin(rotAngle), 0);
					
					indiceIncrement += 4;
	    			sum += increase;
				}
				
				rotAngle += ang;
				sum = 0;
	    }
		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};