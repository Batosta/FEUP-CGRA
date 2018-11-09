/**
 * MyTrapezium
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezium extends CGFobject
{
	constructor(scene, sBase, lBase, h, minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene);
		this.minS = minS;
		this.minT = minT;
		this.maxS = maxS;
		this.maxT = maxT;
		this.shortBase = sBase;
		this.longBase = lBase;
		this.height = h;

		this.quad = new MyQuad(this.scene);
		this.initBuffers();
		
	};

	initBuffers() 
	{
		this.vertices = [
				-this.longBase/2.0, -this.height/2.0, 0,
				this.longBase/2.0, -this.height/2.0, 0,
				-this.shortBase/2.0, this.height/2.0, 0,
				this.shortBase/2.0, this.height/2.0, 0
				];

		this.indices = [
				0, 1, 2, 
				3, 2, 1
			];
		
		this.normals = [
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1
		];

		this.texCoords = [
				this.minS, this.minT,
				this.maxS, this.minT, 
				this.minS, this.maxT,
				this.maxS, this.maxT		
		];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};