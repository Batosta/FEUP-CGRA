/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
				-0.5, -0.5, -0.5,
                0.5, -0.5, -0.5,
                -0.5, 0.5, -0.5,
                0.5, 0.5, -0.5,
                -0.5, -0.5, 0.5,
                0.5, -0.5, 0.5,
                -0.5, 0.5, 0.5,
                0.5, 0.5, 0.5
				];

		this.indices = [
				0, 2, 1, 
				2, 3, 1,
                1, 3, 7,
                1, 7, 5,
                5, 7, 6,
                4, 5, 6,
                6, 2, 0,
                0, 4, 6,
                2, 6, 3,
                3, 6, 7,
                0, 1, 5,
                0, 5, 4
                ];


			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
