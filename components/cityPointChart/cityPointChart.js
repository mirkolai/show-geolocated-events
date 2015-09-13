/**
 * Created by mirko on 06/07/15.
 */

angular.module('cityPointChart',[])
    .factory('d3', function(){

        /*
         we could declare locals or other D3.js specific configuration here.
         */

        return d3;
    })
    .factory('topojson', function(){

        /*
         we could declare locals or other D3.js specific configuration here.
         */

        return topojson;
    })
    .directive('cityPointChart',["d3","topojson", function(d3,topojson) {


        return {

            restrict: 'E',
            scope: {

                data: '='

            },

            compile: function (element, attrs, transclude) {

                /*var margin = {top: 20, right: 20, bottom: 50, left: 150},*/
                var margin = {top: 30, right: 20, bottom: 30, left: 20},
                    width = window.innerWidth*0.6 - margin.left - margin.right,
                    height = window.innerHeight*0.8 - margin.top - margin.bottom;


                scaleoverview = 2000 / 800 * height;
                var projection =  d3.geo.albers()
                    .center([7.67, 45.07])
                    .rotate([0, 0])
                    .parallels([45.0, 45.1])
                    .scale(180000)
                    .translate([width/2, height / 2]);

                var path = d3.geo.path()
                    .projection(projection);

                var svg = d3.select(element[0])
                    .append("svg")
                    .attr("width",  width)
                    .attr("height", height);

                var g = svg.append("g");


                d3.json("json/turin.topo.json", function(error, json) {

                    g.append("g")
                        .attr("id", "city")
                        .selectAll("path")
                        .data(topojson.feature(json, json.objects.output).features)
                        .enter()
                        .append("path")
                        .attr("class","city")
                        .attr("id", function(d) { return d.id; })
                        .attr("d", path)


                });

                return function (scope, element, attrs) {


                    scope.$watch('data', function (newVal, oldVal, scope) {

                        if(scope.data) {

                            var r = d3.scale.linear()
                                .range([5, 10]);

                            r.domain([0, d3.max(scope.data, function (d) {
                                return +d.count;
                            })]);



                            g.selectAll(".circle")
                                .data(scope.data, function(d){return [+d.lon, +d.lat] })
                                .exit()
                                .remove();

                            g.selectAll(".circle")
                                .data(scope.data, function(d){return [+d.lon, +d.lat]})
                                .enter()
                                .append("circle")
                                .attr("class", "point")
                                .attr("class","circle city")
                                .attr("x", function (d) {
                                    return projection([+d.lon, +d.lat])[0]
                                })
                                .attr("y", function (d) {
                                    return projection([+d.lon, +d.lat])[1]
                                })
                                .attr("r", function (d) {
                                    return r(+d.count);
                                })
                                .transition()
                                .duration(750)
                                .attr("transform", function(d) {
                                    return "translate("

                                        +  projection([+d.lon, +d.lat])[0] + ","
                                        +  projection([+d.lon, +d.lat])[1] +
                                        ")"; })

                            g.selectAll(".circle")
                                .data(scope.data, function(d){return [+d.lon, +d.lat]})
                                .attr("r", function (d) {
                                    return r(+d.count);
                                });

                        }


                    }, true);


                }


            }

        }

    }]);
