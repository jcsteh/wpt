// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.filter.canvasFilterObject.componentTransfer.gamma.tentative
// Description:Test pixels on CanvasFilter() componentTransfer with gamma type
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Test pixels on CanvasFilter() componentTransfer with gamma type");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

// From https://www.w3.org/TR/SVG11/filters.html#feComponentTransferElement
function getColor(inputColor, amplitude, exponent, offset) {
    return [
        Math.max(0, Math.min(1, Math.pow(inputColor[0]/255, exponent[0]) * amplitude[0] + offset[0])) * 255,
        Math.max(0, Math.min(1, Math.pow(inputColor[1]/255, exponent[1]) * amplitude[1] + offset[1])) * 255,
        Math.max(0, Math.min(1, Math.pow(inputColor[2]/255, exponent[2]) * amplitude[2] + offset[2])) * 255,
    ];
}

const amplitudes = [2, 1.1, 0.5];
const exponents = [5, 3, 1];
const offsets = [0.25, 0, 0.5];
ctx.filter = new CanvasFilter({filter: 'componentTransfer',
    funcR: {type: 'gamma', amplitude: amplitudes[0], exponent: exponents[0], offset: offsets[0]},
    funcG: {type: 'gamma', amplitude: amplitudes[1], exponent: exponents[1], offset: offsets[1]},
    funcB: {type: 'gamma', amplitude: amplitudes[2], exponent: exponents[2], offset: offsets[2]},
});

const inputColors = [
    [255, 255, 255],
    [0, 0, 0],
    [127, 0, 34],
    [252, 186, 3],
    [50, 68, 87],
];

for (const color of inputColors) {
    let outputColor = getColor(color, amplitudes, exponents, offsets);
    ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.fillRect(0, 0, 10, 10);
    _assertPixelApprox(canvas, 5, 5, outputColor[0],outputColor[1],outputColor[2],255, 2);
}
t.done();

});
done();
