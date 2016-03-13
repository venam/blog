var anim_done = true;

function animate() {
	anim_done = false;

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

	d3.select("#you_2")
		.attr('transform', "rotate(-90)");
	d3.select("#you_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(100)
		.ease('linear')
		.duration(5000)
		.attr('transform', 'translate( 3100, -1000)')
		.each('end', function() {
			anim_done = true;
		});


	d3.select("#crazy_2")
		.attr('transform', "rotate(-90)");
	d3.select("#crazy_1")
		.style('display', 'block')
		.attr('transform', 'translate( 3100, 10600)')
		.transition()
		.delay(1000)
		.ease('ease in')
		.duration(2000)
		.attr('transform', 'translate( 3100, 5000)');

	for (var i=1; i< 10; i++) {
		if (i%2 == 0) {
			change_car_light('#crazy',2, 1500+i*100, 1);
		}
		else {
			change_car_light('#crazy',0, 1500+i*100, 1);
		}
	}

	d3.select("#crazy_1")
		.transition()
		.delay('2000')
		.ease('ease out')
		.duration('500')
		.attr('transform',"translate(3900,4000)");

	d3.select("#crazy_2")
		.transition()
		.delay('2000')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-83)");

	d3.select("#crazy_2")
		.transition()
		.delay('2200')
		.ease('ease in')
		.duration('200')
		.attr('transform', "rotate(-90)");

	d3.select("#crazy_1")
		.transition()
		.delay('2500')
		.ease('ease out')
		.duration('400')
		.attr('transform',"translate(3800,2000)");

	d3.select("#crazy_1")
		.transition()
		.delay('2900')
		.ease('ease out')
		.duration('300')
		.attr('transform',"translate(3200,1000)");


	d3.select("#crazy_1")
		.transition()
		.delay('3200')
		.ease('ease out')
		.duration('300')
		.attr('transform',"translate(3200,-1000)");

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
create_car(carCanvas, "crazy", "#BF3819", 0, 0, 0);
create_car(carCanvas, "you", "#969664", 0, 0, 0);

create_car(carCanvas, "other", "#32A4CE", 0, 0, 0);
create_car(carCanvas, "other2", "#32A4CE", 0, 0, 0);
