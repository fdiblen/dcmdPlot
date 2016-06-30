var data = [{
  name: "name1",
  type: "type1",
  speed: "70",
  range: "15",
  endurance: 80,
  fire: 82
}, {
  name: "name2",
  type: "type1",
  speed: "11",
  range: "30",
  endurance: 80,
  fire: 82
}, {
  name: "name1",
  type: "type1",
  speed: "89",
  range: "55",
  endurance: 74,
  fire: 74
}, {
  name: "name44",
  type: "type1",
  speed: "43",
  range: "70",
  endurance: 74,
  fire: 74
}, {
  name: "name3",
  type: "type2",
  speed: "32",
  range: "90",
  endurance: 16,
  fire: 10
}, {
  name: "name2",
  type: "type3",
  speed: "1",
  range: "112",
  endurance: 69,
  fire: 0
}, {
  name: "name3",
  type: "type3",
  speed: "141",
  range: "3",
  endurance: 71,
  fire: 0
}, {
  name: "name2",
  type: "type3",
  speed: "33",
  range: "24",
  endurance: 50,
  fire: 0
}, {
  name: "name1",
  type: "type3",
  speed: "16",
  range: "42",
  endurance: 50,
  fire: 0
}, {
  name: "name2",
  type: "type2",
  speed: "2",
  range: "61",
  endurance: 19,
  fire: 12
}, {
  name: "name3",
  type: "type2",
  speed: "9",
  range: "9",
  endurance: 15,
  fire: 10
}, {
  name: "name44",
  type: "type2",
  speed: "28",
  range: "17",
  endurance: 15,
  fire: 10
}, {
  name: "name3",
  type: "type2",
  speed: "36",
  range: "21",
  endurance: 15,
  fire: 10
}, {
  name: "name2",
  type: "type2",
  speed: "25",
  range: "341",
  endurance: 15,
  fire: 10
}, {
  name: "name2",
  type: "type2",
  speed: "23",
  range: "771",
  endurance: 15,
  fire: 10
}, {
  name: "name3",
  type: "type2",
  speed: "57",
  range: "800",
  endurance: 15,
  fire: 10
}, {
  name: "name3",
  type: "type2",
  speed: "66",
  range: "117",
  endurance: 15,
  fire: 10
}, {
  name: "name2",
  type: "type2",
  speed: "59",
  range: "141",
  endurance: 15,
  fire: 10
}, {
  name: "name2",
  type: "type4",
  speed: "48",
  range: "199",
  endurance: 25,
  fire: 14
}, {
  name: "name1",
  type: "type4",
  speed: "72",
  range: "121",
  endurance: 25,
  fire: 14
}, {
  name: "name3",
  type: "type1",
  speed: "87",
  range: "115",
  endurance: 63,
  fire: 63
}, {
  name: "name44",
  type: "type1",
  speed: "91",
  range: "36",
  endurance: 63,
  fire: 63
}, {
  name: "name1",
  type: "type1",
  speed: "96",
  range: "13",
  endurance: 63,
  fire: 63
}, {
  name: "name3",
  type: "type1",
  speed: "20",
  range: "55",
  endurance: 63,
  fire: 63
}, {
  name: "name3",
  type: "type5",
  speed: "13",
  range: "25",
  endurance: 30,
  fire: 0
}, {
  name: "name2",
  type: "type1",
  speed: "17",
  range: "7",
  endurance: 67,
  fire: 74
}, {
  name: "name4",
  type: "type1",
  speed: "41",
  range: "51",
  endurance: 67,
  fire: 74
}, {
  name: "name4",
  type: "type4",
  speed: "48",
  range: "23",
  endurance: 23,
  fire: 11
}, {
  name: "name3",
  type: "type4",
  speed: "58",
  range: "19",
  endurance: 23,
  fire: 11
}, {
  name: "name4",
  type: "type5",
  speed: "88",
  range: "0",
  endurance: 31,
  fire: 0
}];



// CROSS FILTER
var cf = crossfilter(data);
var all = cf.groupAll();

// Number of counts
dc.dataCount(".dc-data-count")
  .dimension(cf)
  .group(all);



// ---------- F U N C T I O N S
function remove_empty_bins(source_group) {
  return {
    all: function() {
      return source_group.all().filter(function(d) {
        return d.value != 0;
      });
    }
  };
}


// ---------- B U B L E

// Buble chart dimensions
var extFire = d3.extent(data, function(d) {
  return d.fire;
});

var extEndurance = d3.extent(data, function(d) {
  return d.endurance;
});

var dimAbility2 = cf.dimension(function(d) {
  return [d.fire, d.endurance];
});

var dimGroup2 = dimAbility2.group().reduceCount();
nonEmptyHist = remove_empty_bins(dimGroup2);

var chart2 = dc.bubbleChart('#bubble_plot');
chart2
  .width(800)
  .height(400)
  .dimension(dimAbility2)
  .group(dimGroup2)

.keyAccessor(function(d) {
    return d.key[0];
  })
  .valueAccessor(function(d) {
    return d.key[1];
  })
  .radiusValueAccessor(function(d) {
    return d.value;
  })

.x(d3.scale.linear().domain(extFire))
  .y(d3.scale.linear().domain(extEndurance))
  .r(d3.scale.linear().domain([0, 10]))


.elasticY(true)
  .elasticX(true)
  .xAxisPadding(50)
  .yAxisPadding(50)
  .maxBubbleRelativeSize(0.03)
  .renderHorizontalGridLines(true)
  .renderVerticalGridLines(true)
  .renderLabel(true)
  .renderTitle(true)

.transitionDuration(1000)

.legend(dc.legend().x(70).y(10).itemHeight(13).gap(5))
  .mouseZoomable(true)
  .brushOn(true)

.title(function(d) {
  return 'ability:' + d.key + '\ncount:' + d.value;
})


.yAxisLabel('X-axis')
  .xAxisLabel('Y-axis');


// chart2.yAxis().tickFormat(function(s) {
// 	return s + "K";
// });
//
// chart2.xAxis().tickFormat(function(s) {
// 	return s + "K";
// });



// ---------- S C A T T E R

var dimAbility = cf.dimension(function(d) {
  return [d.fire, d.endurance];
});

var ext = d3.extent(data, function(d) {
  return d.fire;
});

var chartScatter = dc.scatterPlot('#scatter_plot');
chartScatter
  .width(800)
  .height(150)
  .symbolSize(8)
  .dimension(dimAbility)
  .group(dimAbility.group().reduceCount())
  .x(d3.scale.linear().domain(ext))
  .yAxisLabel('X Label')
  .xAxisLabel('Y Label')
  .brushOn(true)

.renderHorizontalGridLines(true)
  .renderVerticalGridLines(true)
  .renderLabel(true)
  .renderTitle(true)

.elasticY(true)
  .elasticX(true)

.xAxisPadding(50)
  .yAxisPadding(50);


// ---------- P I E   C H A R T S

var dimName = cf.dimension(function(d) {
  return d.name;
});

var groupName = dimName.group().reduceCount();

var chartName = dc.pieChart('#namePieChart');
chartName
  .width(300)
  .height(220)
  .cx(160)
  .innerRadius(0)
  .slicesCap(10)
  .dimension(dimName)
  .group(groupName)
  .ordering(function(t) {
    return -t.value;
  })
  .legend(dc.legend());


var dimSpeed = cf.dimension(function(d) {
  return d.speed;
});

var gpSpeed = dimSpeed.group().reduceCount();
var chartSpeed = dc.pieChart('#chart_speed');
chartSpeed
  .width(300)
  .height(220)
  .cx(160)
  .innerRadius(35)
  .slicesCap(Infinity)
  .dimension(dimSpeed)
  .group(gpSpeed)
  .ordering(function(t) {
    return -t.value;
  })
  .legend(dc.legend())
chartSpeed.render();



var dimRange = cf.dimension(function(d) {
  return d.range;
});
var gpRange = dimRange.group().reduceCount();
var chartRange = dc.pieChart('#chart_range');
chartRange
  .width(300)
  .height(220)
  .cx(160)
  .innerRadius(35)
  .slicesCap(Infinity)
  .dimension(dimRange)
  .group(gpRange)
  .ordering(function(t) {
    return -t.value;
  })
  .legend(dc.legend())
chartRange.render();



// -------- ROW CHART

var dimType = cf.dimension(function(d) {
  return d.type;
});

var groupType = dimType.group().reduceCount();


var rowChart = dc.rowChart("#dc-row-graph");

rowChart.width(240)
  .height(260)
  .margins({
    top: 20,
    left: 10,
    right: 10,
    bottom: 20
  })
  .dimension(dimType)
  .group(groupType)
  .renderLabel(true)
  .colors(d3.scale.category10())

// .colors(["#a60000", "#ff0000", "#ff4040", "#ff7373", "#67e667", "#39e639",
// 	"#00cc00"
// ])
.colorDomain([0, 0])
  .elasticX(true)

.renderlet(function(chart) {
    chart2.filter(chart2.filter());
  })
  .on("filtered", function(chart) {
    dc.events.trigger(function() {
      chart2.filter(chart2.filter());
    });
  });



// ---------- T A B L E
var dataTable = dc.dataTable("#dc-table-graph");

// Table of earthquake data
dataTable.width(800).height(800)
  .dimension(dimAbility2)
  .group(function(d) {
    return "List of all data points corresponding to the filters"
  })
  //	.size(20) // number of rows to return
  .columns([
    function(d) {
      return d.name;
    },
    function(d) {
      return d.time;
    },
    function(d) {
      return d.speed;
    },
    function(d) {
      return d.fire;
    },
    function(d) {
      return d.endurance;
    } //,
    // function(d) {
    // 	return '<a href=\"http://maps.google.com/maps?z=11&t=m&q=loc:' + d.lat +
    // 		'+' + d.long + "\" target=\"_blank\">Google Map</a>"
    // },
    // function(d) {
    // 	return '<a href=\"http://www.openstreetmap.org/?mlat=' + d.lat + '&mlon=' +
    // 		d.long + '&zoom=11' + "\" target=\"_blank\"> OSM Map</a>"
    // }
  ])
  .sortBy(function(d) {
    return d.name;
  })
  .order(d3.ascending);


d3.select('#download')
  .on('click', function() {
    var blob = new Blob([d3.csv.format(dimRange.top(Infinity))], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, 'data.csv');
  });



// ---------- C O M P O S I T E

//var composite = dc.compositeChart("#test_composed");
//
//var q = queue()
//    .defer(d3.csv, "morley.csv")
//    .defer(d3.csv, "morley2.csv");
//
//q.await(function(error, exp1, exp2) {
//
//    var ndx = crossfilter();
//    ndx.add(exp1.map(function(d) {
//        return {x: +d.Run, y2:0, y1: d.Speed * d.Run / 1000};
//    }));
//    ndx.add(exp2.map(function(d) {
//        return {x: +d.Run, y1:0, y2: d.Speed * d.Run / 1000};
//    }));
//
//    var dim  = ndx.dimension(dc.pluck('x')),
//        grp1 = dim.group().reduceSum(dc.pluck('y1')),
//        grp2 = dim.group().reduceSum(dc.pluck('y2'));
//
//    composite
//        .width(768)
//        .height(480)
//        .x(d3.scale.linear().domain([0,20]))
//        .yAxisLabel("The Y Axis")
//        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
//        .renderHorizontalGridLines(true)
//        .compose([
//            dc.lineChart(composite)
//                .dimension(dim)
//                .colors('red')
//                .group(grp1, "Top Line")
//                .dashStyle([2,2]),
//            dc.lineChart(composite)
//                .dimension(dim)
//                .colors('blue')
//                .group(grp2, "Bottom Line")
//                .dashStyle([5,5])
//            ])
//        .brushOn(false)
//        .render();
//


// register handlers
d3.selectAll('a#all').on('click', function() {
  dc.filterAll();
  dc.renderAll();
});

d3.selectAll('a#type').on('click', function() {
  rowChart.filterAll();
  dc.redrawAll();
});

d3.selectAll('a#name').on('click', function() {
  chartName.filterAll();
  dc.redrawAll();
});



//// render all the charts
dc.renderAll();
