var Counter = (function () {
    var privateCounter = 0;

    function changeBy(val) {
        privateCounter += val;
    }

    return {
        increment: function () {
            changeBy(1);
        },
        decrement: function () {
            changeBy(-1);
        },
        value: function () {
            return privateCounter;
        },
    };
})();

console.log(Counter.value()); /* Alerts 0 */

Counter.increment();
Counter.increment();

console.log(Counter.value()); /* Alerts 2 */

Counter.decrement();

console.log(Counter.changeBy(1)); /* Alerts 1 */
