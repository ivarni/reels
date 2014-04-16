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
    var svg = body.append('svg')
                .attr('height', 200)
                .attr('width', 600)
                .attr('viewBox', '0 50 80 10');

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

    var createReel = function(index, ttl) {
        var promise = new Promise(function(resolve, reject) {
            var generator = data();
            renderReel(index, generator);
            var intervalId = (function(gen) {
                return setInterval(function() {
                    renderReel(index, gen);
                }, 200)
            }(generator));
            setTimeout(function() {
                clearInterval(intervalId);
                resolve(svg.selectAll('text.reel' + index).data()[2])
            }, ttl);
        });
        return promise;
    }

    createReel(1, 3200).then(function(data) {
        console.log('reel 1: ' + data);
    });
    createReel(2, 3700).then(function(data) {
        console.log('reel 2: ' + data);
    });
    createReel(3, 4300).then(function(data) {
        console.log('reel 3: ' + data);
    });


}());
