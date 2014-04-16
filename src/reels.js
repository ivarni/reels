(function() {
    Array.prototype.rotate = (function() {
        var unshift = Array.prototype.unshift,
            splice = Array.prototype.splice;

        return function(count) {
            var len = this.length >>> 0,
                count = count >> 0;

            unshift.apply(this, splice.call(this, count % len, len));
            return this;
        };
    })();
}());

(function() {

    var body = d3.select('body');
    var svg = body.append('svg');

    function* data() {
        var array = _.shuffle([1, 2, 3, 4, 5]);
        while (true) {
            array.rotate(1);
            yield array;
        }
    };


    var renderReel = function(index, generator) {
        svg.selectAll('text.reel' + index)
            .data([])
            .exit().remove();
        svg.selectAll('text.reel' + index)
            .data(generator.next().value)
            .enter()
                .append('text')
                .text(function(d) {
                    return d;
                })
                .attr('fill', 'red')
                .attr('class', 'reel' + index)
                .attr('x', 20 * index)
                .attr('y', function(d, i) {
                    return 20 * (i + 1);
                });
    }

    var createReel = function(index) {
        var generator = data();
        renderReel(index, generator);
        return (function(gen) {
            return setInterval(function() {
                renderReel(index, gen);
            }, 200)
        }(generator));
    }

    createReel(1);
    createReel(2);
    createReel(3);

}());
