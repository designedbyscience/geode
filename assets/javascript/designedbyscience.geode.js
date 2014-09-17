var designedbyscience = designedbyscience || {};

designedbyscience.geode = {
	
	
	emitter: function(obj){
	

		this.x = obj.x;
		this.y = obj.y;
		this.radius = 0;
		// this.color_index = obj.color_index;
		this.clustering = obj.clustering;
		this.clusters = [];
		console.log(obj.colorSelectorName);
		this.setColorSelector(obj.colorSelectorName, obj.colorSelectorOptions);
	
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
	
	
	
};



designedbyscience.geode.emitter.prototype = {
	
	
	setColorSelector: function(selectorName, options){
		
		// Color List
		if( selectorName === "list"){
			
			this.colorList = options.colorList;
			
		
			this.colorSelector = function(){
				if(!this.color_index){
					
					this.color_index = 0;
				}
				
				var color = this.colorList[this.color_index];
				if( this.color_index < this.colorList.length-1){
		
					this.color_index++;
		
				}else{
					this.color_index = 0;
				}	
	
				
				return color;
			}
		}
		// Color Gradiant
		if( selectorName === "gradient"){
			
			var h = Math.round(Math.random()*360);
			var s = 20;
			var l = 100;
			
			this.currentColor = [h,s,l];
			
			this.colorSelector = function(){
				
				this.currentColor[2] = this.currentColor[2] - 2;
				
				return designedbyscience.utils.canvas.to_hsl_string(this.currentColor[0], this.currentColor[1], this.currentColor[2]);
				
				
			}
			
		}
		
		
	},
	colorSelector: function(){
		
		
		// Want to have various color selectors
		// This is a no-op that can be set to 
		
		
	},
	
	draw: function(c){
	
		var color = this.colorSelector();
	
	

		c.strokeStyle = color;
		c.fillStyle = color;
		c.lineWidth = 20;
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.stroke();
		c.fill();
		c.closePath();
	
		this.radius += 20;	
	
	

	
		for (var i = 0; i < this.clusters.length; i++) {
			var cluster = this.clusters[i];
		
			c.strokeStyle = color;
			c.fillStyle = color;
			c.lineWidth = 20;
			c.beginPath();
			c.arc(cluster.x, cluster.y, this.radius, 0, Math.PI*2, false);
			c.stroke();
			c.fill();
			c.closePath();
	
		}
	}

}