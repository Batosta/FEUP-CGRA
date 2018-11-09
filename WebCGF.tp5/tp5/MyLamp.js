/**
 * MyLamp
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject
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

		var rotAngleZ = 0.0;
		var angZ = Math.PI / this.stacks;			// How much has to increase in the Z coordinates for each stack.

		var rotAngleXY = 0;
		var angXY = 2 * Math.PI / this.slices;		// How much has to turn in the XY coordinates for each slice.

		var indiceNumber = 0;
		

		for(var i = 0; i < this.stacks; i++){
			
			for(var k = 0; k < this.slices; k++){

				
				this.vertices.push(
				Math.cos(rotAngleZ) * Math.cos(rotAngleXY), 		//cos(rotAngleZ) gives direction and cos(rotAngleXY) gives how close to the origin;
				Math.cos(rotAngleZ) * Math.sin(rotAngleXY), 		//cos(rotAngleZ) gives direction and sin(rotAngleXY) gives how close to the origin;
				Math.sin(rotAngleZ));								//sin(rotAngleZ) to differ the stacks.

				// Has to be exactly like the vertice. Represents the vector between the vertice and the center of the semi-sphere.
				this.normals.push(
				Math.cos(rotAngleZ) * Math.cos(rotAngleXY), 
				Math.cos(rotAngleZ) * Math.sin(rotAngleXY), 
				Math.sin(rotAngleZ));

				rotAngleXY += angXY;


				if(i != this.stacks - 1){
					if(k != this.slices - 1){
					
						this.indices.push(indiceNumber, indiceNumber + 1, indiceNumber + this.slices);
						this.indices.push(indiceNumber, indiceNumber + this.slices, indiceNumber + this.slices - 1);
					} else{

						this.indices.push(indiceNumber, this.slices * i, this.slices * (i+1));
						this.indices.push(indiceNumber, this.slices * (i+1), this.slices * (i+1) + this.slices - 1);
					}

				} else{
					
					if(k != this.slices - 1){

						this.indices.push(indiceNumber, indiceNumber + 1, this.stacks * this.slices)
					} else {

						this.indices.push(indiceNumber, indiceNumber - this.slices + 1, this.stacks * this.slices)
					}
				}
				
				indiceNumber++;
			}
			
			rotAngleZ += angZ;
		}
		
		this.vertices.push(0,0,1);
		this.normals.push(0,0,1);

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
