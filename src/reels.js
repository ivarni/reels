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
        var array = [1, 2, 3, 4, 5]
        while (true) {
            array.rotate(1);
            yield array;
        }
    };

    var generator = data();

    var render = function() {
        svg.selectAll('text')
            .data([])
            .exit().remove();
        svg.selectAll('text')
            .data(generator.next().value)
            .enter()
                .append('text')
                .text(function(d) {
                    return d;
                })
                .attr('fill', 'red')
                .attr('x', 20)
                .attr('y', function(d, i) {
                    return 20 * (i + 1);
                });
    }


    setInterval(function() {
        render();
    }, 100);

}());
