var anim_done = true;

function animate() {
	anim_done = false;
	change_car_light('#right_car',1, 1, 1);
	change_car_light('#under_car',1, 1, 1);


	d3.select("#you_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)');
	d3.select("#you_2")
		.attr('transform', "rotate(-90)");
	d3.select("#you_1")
		.transition()
		.delay('1400')
		.ease('ease out')
		.duration('1200')
		.attr('transform',"translate(3100,5000)");
	d3.select("#you_1")
		.transition()
		.delay('2600')
		.ease('ease out')
		.duration('2700')
		.attr('transform',"translate(3100,0)");

	
	d3.select("#other_side_car1_1")
		.style('display', 'block')
		.attr('transform', 'translate( 900, -1300)')
		.transition()
		.delay('500')
		.ease('ease out')
		.duration('4200')
		.attr('transform',"translate(900,9990)")

	d3.select("#other_side_car2_1")
		.style('display', 'block')
		.attr('transform', 'translate( 1900, -3300)')
		.transition()
		.delay('1500')
		.ease('ease out')
		.duration('2500')
		.attr('transform',"translate(1900,9990)")


	d3.select("#other_side_car3_1")
		.style('display', 'block')
		.attr('transform', 'translate( 1900, -3300)')
		.transition()
		.delay('1800')
		.ease('ease out')
		.duration('2500')
		.attr('transform',"translate(1900,9990)")


	d3.select("#right_car_1")
		.style('display', 'block')
		.attr('transform', 'translate( 4100, 10700)');
	d3.select("#right_car_2")
		.attr('transform', "rotate(-90)");
	d3.select("#right_car_1")
		.transition()
		.delay('1000')
		.ease('ease out')
		.duration('6200')
		.attr('transform',"translate(4100,0)")
		.each('end', function() {
			anim_done = true;
		});

	change_car_light('#right_car',2, 2000, 1);


	d3.select("#under_car_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)');
	d3.select("#under_car_2")
		.attr('transform', "rotate(-90)");
	d3.select("#under_car_1")
		.transition()
		.delay('1900')
		.ease('ease out')
		.duration('2000')
		.attr('transform',"translate(3100,4000)");

	d3.select("#under_car_1")
		.transition()
		.delay('3900')
		.ease('ease out')
		.duration('2100')
		.attr('transform',"translate(3100,0)");
	change_car_light('#under_car',2, 2300, 1);

}

var width = 300;
var height = 460;

var carCanvas = d3.select("#rect-demo")
	.append('svg')
	.style("box-shadow",'3px 3px  5px #212121')
	.attr('viewBox','0 0 6000 9200')
	.attr('width',width)
	.attr('height',height)
	.on("click", function() {
		if (anim_done == true) {
			animate()
		}
	});
draw_background(carCanvas, 1);
create_car(carCanvas, "you", "#969664", 1, 0, 0);
create_car(carCanvas, "right_car", "#BF3819", 1, 0, 0);
create_car(carCanvas, "other_side_car1", "#BF3819", 1, 0, 0);
create_car(carCanvas, "other_side_car2", "#BF3819", 2, 0, 0);
create_car(carCanvas, "other_side_car3", "#BF3819", 2, 0, 0);
create_car(carCanvas, "under_car", "#BF3819", 1, 0, 0);
