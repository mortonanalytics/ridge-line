 function addRidgeLines(svg, chart,lys, that){
		var transitionSpeed = 1000;
    const width = document.body.clientWidth,
      height = 400,
      margin = {left:40, right:40, top:25, bottom:25};
		
		var x = lys[0].mapping.x_var;
		var y = lys[0].mapping.y_var
		
		var area_function = d3.area()
			.curve(d3.curveBasis)
			//.defined(d => !isNaN(d))
			.x( function(d) { return that.xScale(d[x]) })
			.y0(0)
			.y1( function(d) { return that.yScale(d[y]); });
			
		var line_function = area_function.lineY1()
		
		var ridge = chart
			.selectAll( 'g' )
			.data( lys )
			.join('g')
			.style('fill', 'lightsteelblue' )
			.style('stroke', 'steelblue')
			.attr('class', 'tag-grouped-line-g' )
			.attr("transform", function(d) { return 'translate(0,' + (that.ridgeScale(d.label) + 1) +  ')' ;});
			
		var area_ = ridge
			.selectAll('.tag-area')
			.data(d => [d.data] );
			
		area_.exit().remove();
			
		var newArea = area_
			.enter()
			.append('path')
			.attr('class', 'tag-area');
		
		area_.merge(newArea)
			.transition()
			.ease(d3.easeQuad)
			.duration(transitionSpeed)
			.attr("d", function(d){ return area_function(d); });	

		var line = ridge
			.selectAll('.tag-line')
			.data(d => [d.data] );
			
		line.exit().remove();
			
		var newLine = line
			.enter()
			.append('path')
			.style('fill', 'none')
			.attr('class', 'tag-line');
		
		line.merge(newLine)
			.transition()
			.ease(d3.easeQuad)
			.duration(transitionSpeed)
			.attr("d", function(d){ return line_function(d); });
      
    const tooltip =   
    const toolLine =  chart.append('line').attr('class', 'toolLine');
		const toolTipBox = svg.append("rect")
					.attr('class', 'toolTipBox')
					.attr("opacity", 0)
					.attr("width", width - (margin.left + margin.right))
					.attr("height", height - ( margin.top + margin.bottom))
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					.on("mouseover", function() { 
						tooltip.style("display", null); 
						toolLine.style("stroke", null); 
						})
					.on("mouseout", function() { 
						tooltip.style("display", "none"); 
						toolLine.style("stroke", "none"); 
						})
					.on("mousemove", scalePointPosition);
    function scalePointPosition(){
      
    }

	};
  
export {addRidgeLines};