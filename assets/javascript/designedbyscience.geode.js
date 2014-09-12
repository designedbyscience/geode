var designedbyscience = designedbyscience || {};

designedbyscience.geode = {};

designedbyscience.geode.emitter = function(obj){
	

	this.x = obj.x;
	this.y = obj.y;
	this.radius = 0;
	this.color_index = obj.color_index;
	this.clustering = obj.clustering;
	this.clusters = [];
	
	// Make some clustered emitters
	for (var j = 0; j < this.clustering; j++) {

		var ce = {};
		
		ce.x = (Math.random()*40)+this.x
		ce.y = (Math.random()*40)+this.y
		ce.ci = this.ci;

		ce.radius = 0;
		
		this.clusters.push(ce);
	}
}
designedbyscience.geode.emitter.prototype.draw = function(c){
	
	c.strokeStyle = designedbyscience.geode.colors[this.color_index];
	c.fillStyle = designedbyscience.geode.colors[this.color_index];
	c.lineWidth = 40;
	c.beginPath();
	c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
	c.stroke();
	c.fill();
	c.closePath();
	
	this.radius += 40;	
	
	
	if( this.color_index < designedbyscience.geode.colors.length-1){
		
		this.color_index++;
		
	}else{
		this.color_index = 0;
	}	
	
	
	for (var i = 0; i < this.clusters.length; i++) {
		var cluster = this.clusters[i];
		
		c.strokeStyle = designedbyscience.geode.colors[this.color_index];
		c.fillStyle = designedbyscience.geode.colors[this.color_index];
		c.lineWidth = 40;
		c.beginPath();
		c.arc(cluster.x, cluster.y, this.radius, 0, Math.PI*2, false);
		c.stroke();
		c.fill();
		c.closePath();
	
	}
}

