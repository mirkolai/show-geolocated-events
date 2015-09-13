/**
 * Created by mirko on 04/07/15.
 */


angular.module('linechartBrush',[])
    .factory('d3', function(){

        /*
         we could declare locals or other D3.js specific configuration here.
         */

        return d3;
    })
    .directive('linechartBrush',["d3", function(d3) {

        return {

            restrict: 'E',
            scope: {

                data: '=',
                focusinterval: '=',
                contextinterval:'='

            },

            compile: function (element, attrs, transclude) {
                var dispatch = d3.dispatch(
                    "brush"
                );

                var margin  = {top: 3, right: 3, bottom: 20, left: 100},
                    width   = window.innerWidth*0.6 - margin.left - margin.right,
                    height  = window.innerHeight*0.1  - margin.top - margin.bottom


                var x  = d3.time.scale().range([0, width]),
                    x2 = d3.time.scale().range([0, width]),
                    y  = d3.scale.linear().range([height, 0]),
                    y2 = d3.scale.linear().range([height, 0]);

                var xAxis = d3.svg.axis().scale(x2).orient("bottom")
                var brush = d3.svg.brush()
                    .x(x2)
                    .on("brush",  function () {
                        dispatch.brush(brush)
                    });

                var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

                var area = d3.svg.area()
                    .interpolate("monotone")
                    .x(function(d) { return x2(d.date); })
                    .y0(height)
                    .y1(function(d) { return y2(+d.count); });

                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);

                svg.append("defs")
                    .append("clipPath")
                    .attr("id", "clip")
                    .append("rect")
                    .attr("width", width)
                    .attr("height", height);

                var context = svg.append("g")
                    .attr("class", "context")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                context.append("path")
                    .datum([])
                    .attr("class", "area")
                    .attr("d", area);

                context.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0,"+height+")")
                    .call(xAxis);

                var contextBrush = context.append("g")
                    .attr("class", "x brush")
                    .call(brush);

                context.selectAll("rect")
                    .attr("y", -6)
                    .attr("height", height + 7);



            return function (scope, element, attrs) {


                    dispatch.on('brush', function(brush2) {

                        var extent0 = brush2.extent(),
                            extent1;

                        // if dragging, preserve the width of the extent
                        if (d3.event.mode === "move") {
                            var d0 = d3.time.day.round(extent0[0]),
                                d1 = d3.time.day.offset(d0, Math.round((extent0[1] - extent0[0]) / 864e5));
                            extent1 = [d0, d1];
                        }else{
                            extent1 = extent0.map(d3.time.day.round);

                            // if empty when rounded, use floor & ceil instead
                            if (extent1[0] >= extent1[1]) {
                                extent1[0] = d3.time.day.floor(extent0[0]);
                                extent1[1] = d3.time.day.ceil(extent0[1]);
                            }
                        }

                        if(scope.contextinterval[0].getTime() != extent1[0].getTime() ||
                            scope.contextinterval[1].getTime() != extent1[1].getTime()) {

                            scope.$apply(function () {

                                scope.contextinterval = [extent1[0], extent1[1]];

                            })
                        }

                        contextBrush.call(brush2.extent(extent1));

                        x.domain(brush2.empty() ? x2.domain() : [ extent1[0], extent1[1]]);




                    });

                    scope.$watch('data', function (newVal, oldVal, scope) {

                        if(scope.data) {

                            var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

                            var maxdate=d3.max(scope.data.map(function(d) { return parseDate(d.date); }));

                            var mindate=d3.min(scope.data.map(function(d) { return parseDate(d.date); }));
                            var nextday = new Date(maxdate);
                            nextday.setDate(maxdate.getDate() + 1);
                            nextday.setHours(0);
                            nextday.setMinutes(0);
                            nextday.setSeconds(0);


                            var previousday = new Date(mindate);
                            previousday.setDate(mindate.getDate() -1);
                            previousday.setHours(0);
                            previousday.setMinutes(0);
                            previousday.setSeconds(0);


                            x.domain([previousday,nextday]);
                            scope.contextinterval = x.domain();

                            y.domain([0, d3.max(scope.data.map(function(d) { return +d.count; }))]);
                            x2.domain(x.domain());
                            y2.domain(y.domain());


                            var data = [];
                            var alldays = d3.time.hour.range(mindate,nextday);

                            for( var i=0; i< alldays.length;i++){
                                var cur={};
                                cur.date=alldays[i];
                                cur.count=0;
                                scope.data.forEach(function(d) {
                                    if(+parseDate(d.date)===+alldays[i]){
                                        cur.count= d.count;
                                    }
                                });
                                data.push(cur)
                            }

                            context.selectAll(".brush")
                                .transition()
                                .duration(750)
                                .call(brush.clear());

                            context.select("path")
                                .datum(data)
                                .attr("class", "area")
                                .transition()
                                .duration(750)
                                .attr("d", area);

                            context.select(".x.axis")
                                .transition()
                                .duration(750)
                                .call(xAxis);

                        }
                    }, true);


                }


            }

        }

    }]);
