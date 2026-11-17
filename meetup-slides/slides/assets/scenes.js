/* Shared isometric scenes for the OVH x Elastic deck. Built on style/eweb.js */
window.OVH = (function(){
  const RED = {top:'#FFFFFF', left:'#E0352B', right:'#9E1F18'};
  const S = {};

  // Hero: Fleet platform, signal columns, an Elasticsearch cube docked in glass.
  S.cover = function(svg){
    const sc = EW.iso(svg, {ox: 300, oy: 300, s: .8});
    sc.rect({x: -30, y: -30, w: 330, d: 330, z: 0, delay: .05, dash: '2 4'});
    sc.box({x: 0, y: 0, w: 270, d: 270, h: 46, c: 'blue', delay: .1, drop: 60, snap: false, order: -1000});
    [[22,118],[78,88],[134,58]].forEach(([x,h],i) => sc.box({x, y: 150, w: 44, d: 100, h, z: 46, c: 'slate', stroke: false, delay: .3 + i*.06, drop: 50, order: 100}));
    sc.box({x: 190, y: 26, w: 60, d: 60, h: 76, z: 46, c: 'teal', delay: .5, drop: 50, order: 70});
    sc.box({x: 72, y: 34, w: 80, d: 80, h: 80, z: 46, c: 'blue', delay: .7, drop: 150, order: 50});
    sc.box({x: 60, y: 22, w: 104, d: 104, h: 104, z: 46, c: 'glass', wire: true, inner: true, stroke: '#343741', delay: .95, drop: 0, snap: false, order: 60});
    sc.label({at: [164, 22, 46 + 90], side: 'r', len: 50, title: 'Elasticsearch', sub: 'One place to look', delay: 1.2});
    sc.label({at: [22, 250, 46 + 100], side: 'l', len: 60, title: 'OVH signals', sub: 'Eleven products', delay: 1.1});
    sc.label({at: [250, 26, 46 + 38], side: 'r', len: 40, title: 'Integrations', sub: 'CEL + ECS', delay: 1.25});
    sc.label({at: [270, 60, 23], side: 'r', len: 36, title: 'Fleet', sub: 'The platform', delay: 1.35});
    return sc;
  };

  // Fragmented: eleven separate cubes, one per OVH product, colored by group.
  S.scatter = function(svg){
    const sc = EW.iso(svg, {ox: 300, oy: 200, s: .9});
    sc.rect({x: -20, y: -20, w: 370, d: 280, z: 0, delay: .05, dash: '2 4'});
    const B = 'blue', T = 'teal', O = 'orange', P = 'pink';
    const cubes = [[B,60],[B,76],[B,52],[B,68],[T,56],[T,72],[T,48],[O,64],[O,44],[O,58],[P,70]];
    const jit = [[0,6],[8,-4],[-4,8],[6,0],[-6,2],[4,8],[0,-6],[8,4],[-2,6],[6,-4],[0,2]];
    cubes.forEach(([c,h],i) => sc.box({x: (i % 4) * 92 + jit[i][0], y: Math.floor(i / 4) * 92 + jit[i][1], w: 52, d: 52, h, c, delay: .2 + i*.08, drop: 90, float: 3.5, floatSpeed: .9 + i*.09, phase: i}));
    return sc;
  };

  // Normalised: the same cubes, one size, one color, in a tight grid.
  S.schema = function(svg){
    const sc = EW.iso(svg, {ox: 330, oy: 200, s: .95});
    sc.box({x: -14, y: -14, w: 216, d: 216, h: 12, c: 'slate', stroke: false, delay: .05, drop: 30, snap: false, order: -1000});
    let i = 0;
    for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++, i++)
      sc.box({x: q * 70, y: r * 70, z: 12, w: 58, d: 58, h: 46, c: 'blue', delay: .25 + i*.07, drop: 80});
    return sc;
  };

  // Build: five labelled steps climbing up and to the right; the last one is live.
  S.build = function(svg, o){
    const sc = EW.iso(svg, {ox: 470, oy: 395, s: .85});
    sc.rect({x: -20, y: -20, w: 150, d: 316, z: 0, delay: .05, dash: '2 4'});
    const names = ['01 Pick an input', '02 Map to ECS', '03 Add the value', '04 Test end to end', '05 Publish'];
    [40,70,100,130,160].forEach((h, i) => {
      const y = (4 - i) * 56;
      sc.box({x: 0, y, w: 110, d: 46, h, c: i === 4 ? 'teal' : 'slate', stroke: i === 4 ? '#1D1E24' : false, delay: .2 + i*.14, drop: 80, order: -i});
      sc.label({at: [55, y + 46, h - 8], side: 'l', len: 70, title: names[i], delay: .9 + i*.1});
    });
    return sc;
  };

  // Tour: Fleet platform carrying all eleven integrations, plus an empty slot for the next one.
  S.tour = function(svg){
    const sc = EW.iso(svg, {ox: 300, oy: 300, s: .8});
    sc.rect({x: -30, y: -30, w: 330, d: 330, z: 0, delay: .05, dash: '2 4'});
    sc.box({x: 0, y: 0, w: 270, d: 270, h: 46, c: 'blue', delay: .1, drop: 60, snap: false, order: -1000});
    // [color, height] in reading order: compute, dedicated, k8s, rancher / dbaas, object, lb, network / billing, iam, ai, (next)
    const g = [['blue',78],['blue',70],['blue',74],['blue',66], ['teal',50],['teal',56],['teal',44],['orange',52], ['orange',30],['orange',36],['pink',32],null];
    g.forEach((v, i) => {
      const x = 16 + (i % 4) * 62, y = 16 + Math.floor(i / 4) * 80;
      if (!v) { sc.rect({x, y, z: 46, w: 50, d: 50, delay: 1.5, layer: 'top', dash: '3 3'}); return; }
      sc.box({x, y, z: 46, w: 50, d: 50, h: v[1], c: v[0], delay: .3 + i * .09, drop: 100});
    });
    return sc;
  };

  // Incident: a uniform field with one red cube and a pulsing halo.
  S.demo = function(svg){
    const sc = EW.iso(svg, {ox: 330, oy: 200, s: .95});
    sc.box({x: -14, y: -14, w: 216, d: 216, h: 12, c: 'slate', stroke: false, delay: .05, drop: 30, snap: false, order: -1000});
    let i = 0;
    for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++, i++){
      const hot = r === 1 && q === 1;
      sc.box({x: q * 70, y: r * 70, z: 12, w: 58, d: 58, h: hot ? 92 : 46, c: hot ? RED : 'blue', delay: .25 + i*.07, drop: 80});
    }
    const [cx, cy] = sc.P(70 + 29, 70 + 29, 12);
    const ring = EW.el('ellipse', {cx, cy, rx: 10, ry: 6, fill: 'none', stroke: '#E0352B', 'stroke-width': 1.4, opacity: 0}, sc.floor);
    EW.loop(t => { if (t < 1.6) return; const k = ((t - 1.6) % 2.4) / 2.4, r = 40 + k * 130;
      ring.setAttribute('rx', r); ring.setAttribute('ry', r * .58); ring.setAttribute('opacity', (1 - k) * .6); });
    return sc;
  };

  // Hands-on: an API doc goes in, an integration comes out.
  S.handson = function(svg){
    const sc = EW.iso(svg, {ox: 320, oy: 250, s: .9});
    sc.box({x: 0, y: 0, w: 240, d: 240, h: 30, c: 'slate', stroke: false, delay: .05, drop: 30, snap: false, order: -1000});
    [0,13,26].forEach((z,i) => sc.box({x: 20, y: 130, z: 30 + z, w: 100, d: 80, h: 10, c: 'orange', delay: .3 + i*.12, drop: 70}));
    sc.box({x: 130, y: 20, z: 30, w: 90, d: 90, h: 90, c: 'blue', delay: .8, drop: 100});
    sc.label({at: [20, 210, 30 + 18], side: 'l', len: 50, title: 'Your API doc', sub: 'Bring one', delay: 1.3});
    sc.label({at: [220, 50, 30 + 45], side: 'r', len: 50, title: 'Fleet integration', sub: 'Leave with it', delay: 1.5});
    return sc;
  };

  // AI: a pink model docked in glass on the Elastic platform.
  function ai(svg, cols, labels){
    const sc = EW.iso(svg, {ox: 270, oy: 300, s: .8});
    sc.rect({x: -30, y: -30, w: 330, d: 330, z: 0, delay: .05, dash: '2 4'});
    sc.box({x: 0, y: 0, w: 270, d: 270, h: 46, c: 'blue', delay: .1, drop: 60, snap: false, order: -1000});
    if (cols){
      [[22,118],[78,88],[134,58]].forEach(([x,h],i) => sc.box({x, y: 150, w: 44, d: 100, h, z: 46, c: 'slate', stroke: false, delay: .3 + i*.06, drop: 50, order: 100}));
      sc.box({x: 190, y: 26, w: 60, d: 60, h: 76, z: 46, c: 'teal', delay: .5, drop: 50, order: 70});
    }
    sc.box({x: 72, y: 34, w: 80, d: 80, h: 80, z: 46, c: 'pink', delay: .7, drop: 150, order: 50});
    sc.box({x: 60, y: 22, w: 104, d: 104, h: 104, z: 46, c: 'glass', wire: true, inner: true, stroke: '#343741', delay: .95, drop: 0, snap: false, order: 60});
    if (labels){
      sc.label({at: [164, 22, 46 + 90], side: 'r', len: 50, title: 'OVH AI Endpoints', sub: 'The model', delay: 1.2});
      sc.label({at: [270, 60, 23], side: 'r', len: 64, title: 'Elastic AI Assistant', sub: 'The connector', delay: 1.35});
    }
    const [cx, cy] = sc.P(112, 74, 46);
    const ring = EW.el('ellipse', {cx, cy, rx: 10, ry: 5.8, fill: 'none', stroke: '#F04E98', 'stroke-width': 1.2, opacity: 0}, sc.floor);
    EW.loop(t => { if (t < 1.6) return; const k = ((t - 1.6) % 2.6) / 2.6;
      ring.setAttribute('rx', 60 + k * 120); ring.setAttribute('ry', (60 + k * 120) * .58); ring.setAttribute('opacity', (1 - k) * .6); });
    return sc;
  }
  S.ai = svg => ai(svg, false, true);
  S.closing = svg => ai(svg, true, false);

  return {
    scene(kind, o){
      o = o || {};
      EW.dots({x: 640, y: 30, w: 640, h: 660, seed: o.seed || 4, blobs: 6, thr: .5});
      const sc = S[kind](document.getElementById('hero'), o);
      sc.run();
      return sc;
    },
    // small isometric cube icon: svg element, color key or face set
    mini(svg, c, delay){
      const sc = EW.iso(svg, {ox: 32, oy: 30, s: .55});
      sc.box({x: 0, y: 0, w: 44, d: 44, h: 44, c: c === 'red' ? RED : c, delay: delay || .3, drop: 40, shadow: false});
      sc.run();
    }
  };
})();
