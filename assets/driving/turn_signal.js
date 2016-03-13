var anim_done = true;

function animate() {
	anim_done = false;
	change_car_flasher('#asshole', false, 'right',1, 0);
	change_car_flasher('#asshole', false, 'left', 1, 0);

	d3.select("#other_1")
		.style('display', 'block')
		.attr('transform', 'translate( 1750, -1600)')
		.transition()
		.delay(1500)
		.duration(2400)
		.attr('transform', 'translate( 1800, 10000)');
	d3.select("#other2_1")
		.style('display', 'block')
		.attr('transform', 'translate( 1800, -1600)')
		.transition()
		.delay(500)
		.duration(2000)
		.attr('transform', 'translate( 1800, 10000)');


	d3.select("#you_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)');
	d3.select("#you_2")
		.attr('transform', "rotate(-90)");

	d3.select("#almostdie_1")
		.style('display', 'block')
		.attr('transform', 'translate( 4100, 10600)');
	d3.select("#almostdie_2")
		.attr('transform', "rotate(-90)");


	d3.select("#almostdie_1")
		.transition()
		.delay('600')
		.ease('ease out')
		.duration('3600')
		.attr('transform',"translate(4100,-1800)");

	d3.select("#asshole_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3200, 10600)');
	d3.select("#asshole_2")
		.attr('transform', "rotate(-90)");
	d3.select("#asshole_1")
		.transition()
		.delay('100')
		.ease('ease out')
		.duration('1500')
		.attr('transform',"translate(3100,3800)");
	d3.select("#asshole_1")
		.transition()
		.delay('1600')
		.ease('ease out')
		.duration('500')
		.attr('transform',"translate(4000,3000)")
	d3.select("#asshole_1")
		.transition()
		.delay('2100')
		.ease('ease out')
		.duration('1000')
		.attr('transform',"translate(5000,2000)")
	d3.select("#asshole_2")
		.transition()
		.delay('1900')
		.ease('linear')
		.duration('1000')
		.attr('transform', "rotate(0)");
	d3.select("#asshole_1")
		.transition()
		.delay('3100')
		.ease('ease out')
		.duration('900')
		.attr('transform',"translate(7000,2000)")
	change_car_flasher('#asshole', true, 'right',1300, 0);
	change_car_flasher('#asshole', true, 'left', 1300, 0);

	change_car_flasher('#you', true, 'right',1400, 0);
	change_car_flasher('#you', true, 'left', 1400, 0);

	d3.select("#you_1")
		.transition()
		.delay('300')
		.ease('ease out')
		.duration('1400')
		.attr('transform',"translate(3100,5200)");

	d3.select("#you_1")
		.transition()
		.delay('1700')
		.ease('ease out')
		.duration('700')
		.attr('transform',"translate(3100,3800)");

	change_car_flasher('#you', false, 'right',2200, 0);
	change_car_flasher('#you', false, 'left', 2200, 0);

	d3.select("#you_1")
		.transition()
		.delay('2400')
		.ease('ease out')
		.duration('1000')
		.attr('transform',"translate(3100,0)")
		.each('end', function() {
			anim_done = true;
		});
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




draw_background(carCanvas, 0);
carCanvas.append("rect")
	.attr('width', 1350)
	.attr('height', 900)
	.attr('x', 4800)
	.attr('y', 1700)
	.style('fill', '#808080');

create_car(carCanvas, "you", "#969664", 0, 0, 0);
create_car(carCanvas, "asshole", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "almostdie", "#32A4CE", 0, 0, 0);

create_car(carCanvas, "other", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "other2", "#32A4CE", 0, 0, 0);
