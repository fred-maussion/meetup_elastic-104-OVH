/* Isometric block people for the deck (built on style/eweb.js). Figures face +y (towards the viewer, down-left). */
window.PPL = (function(){
  const C = .8660254;
  const F = {
    pink:  {top:'#FFD3E6', left:'#F04E98', right:'#C23A7A'},
    white: {top:'#FFFFFF', left:'#FFFFFF', right:'#DDE3EC'},
    hair:  {top:'#9C6B3C', left:'#6B4321', right:'#4A2E16'},
    skin:  {top:'#FFE6D2', left:'#FFCFB0', right:'#E7A982'}
  };
  const B = (sc, o) => sc.box(Object.assign({drop: 90, shadow: false}, o));
  const poly = (sc, yp, pts, fill, extra) => EW.el('polygon', Object.assign({points: pts.map(([x, z]) => sc.P(x, yp, z).map(n => n.toFixed(1)).join(',')).join(' '), fill}, extra || {}), sc.top);

  function iso(svg, o){ const sc = EW.iso(svg, o); sc.s = o.s; return sc; }

  // OVHcloud mark skewed onto a front face (plane y = yp); x = left edge, zt = top edge, size in scene units
  function mark(sc, x, yp, zt, size, delay){
    const [e, f] = sc.P(x, yp, zt), s = sc.s, k = size / 47.18;
    sc.top.insertAdjacentHTML('beforeend',
      `<g style="animation:fi .4s ease ${delay}s both" transform="matrix(${(C*s).toFixed(3)} ${(.5*s).toFixed(3)} 0 ${s} ${e.toFixed(1)} ${f.toFixed(1)}) scale(${k.toFixed(4)})"><svg width="47.18" height="47.18" viewBox="0 0 47.18 47.18" overflow="hidden"><image href="assets/img/ovh-wordmark.svg" width="298.03" height="47.18"/></svg></g>`);
  }

  // legs, belt and torso shared by the standing figures
  function body(sc, x0, y0, d, torso, legs){
    B(sc, {x: x0 + 6,  y: y0 + 4, w: 13, d: 15, z: 0, h: 6, c: 'ink', delay: d});
    B(sc, {x: x0 + 23, y: y0 + 4, w: 13, d: 15, z: 0, h: 6, c: 'ink', delay: d});
    B(sc, {x: x0 + 8,  y: y0 + 6, w: 11, d: 12, z: 6, h: 28, c: legs, delay: d + .05});
    B(sc, {x: x0 + 23, y: y0 + 6, w: 11, d: 12, z: 6, h: 28, c: legs, delay: d + .05});
    B(sc, {x: x0 + 4,  y: y0 + 4, w: 34, d: 18, z: 34, h: 30, c: torso, delay: d + .1});
  }
  function arms(sc, x0, y0, d, c, hand){
    const front = [];
    [x0 - 8, x0 + 38].forEach((x, i) => {
      front.push(B(sc, {x, y: y0 + 13, w: 12, d: 9, z: 38, h: 26, c, delay: d + .15 + i*.03}));
      front.push(B(sc, {x: x + 1, y: y0 + 22, w: 10, d: 7, z: 36, h: 8, c: hand, delay: d + .2 + i*.03}));
    });
    return front;
  }

  // The SRE: blue torso, white head, ink hair, teal headset (same as the desk figure)
  function sre(sc, x0, y0, d){
    body(sc, x0, y0, d, 'blue', 'ink');
    const fr = arms(sc, x0, y0, d, 'blue', 'white');
    B(sc, {x: x0 + 12, y: y0 + 6, w: 18, d: 16, z: 64, h: 20, c: 'white', delay: d + .2});
    B(sc, {x: x0 + 11, y: y0 + 5, w: 20, d: 18, z: 80, h: 8, c: 'ink', delay: d + .25});
    B(sc, {x: x0 + 11, y: y0 + 20, w: 20, d: 4, z: 66, h: 14, c: 'ink', delay: d + .25});
    B(sc, {x: x0 + 10, y: y0 + 8, w: 22, d: 4, z: 86, h: 3, c: 'teal', delay: d + .3});
    B(sc, {x: x0 + 8, y: y0 + 9, w: 4, d: 10, z: 68, h: 11, c: 'teal', delay: d + .3});
    B(sc, {x: x0 + 30, y: y0 + 9, w: 4, d: 10, z: 68, h: 11, c: 'teal', delay: d + .3});
    return {front: fr, head: sc.P(x0 + 21, y0 + 14, 94)};
  }

  // A person from OVHcloud: white shirt with the OVHcloud mark, brown hair
  function ovh(sc, x0, y0, d){
    body(sc, x0, y0, d, F.white, 'blue');
    const fr = arms(sc, x0, y0, d, F.white, F.skin);
    B(sc, {x: x0 + 12, y: y0 + 6, w: 18, d: 16, z: 64, h: 20, c: F.skin, delay: d + .2});
    B(sc, {x: x0 + 11, y: y0 + 5, w: 20, d: 18, z: 80, h: 9, c: F.hair, delay: d + .25});
    B(sc, {x: x0 + 11, y: y0 + 20, w: 20, d: 4, z: 64, h: 18, c: F.hair, delay: d + .25});
    return {front: fr, head: sc.P(x0 + 21, y0 + 14, 94), chest: () => mark(sc, x0 + 15, y0 + 22, 60, 12, d + .8)};
  }

  // The AI: pink torso and cube head with an antenna. The face is a white plate with the OVHcloud mark, hidden under a yellow disguise mask.
  function ai(sc, x0, y0, d, o){
    o = o || {};
    body(sc, x0, y0, d, F.pink, 'ink');
    const fr = arms(sc, x0, y0, d, F.pink, 'white');
    B(sc, {x: x0 + 8, y: y0 + 4, w: 26, d: 22, z: 62, h: 26, c: F.pink, delay: d + .2});
    B(sc, {x: x0 + 19, y: y0 + 13, w: 4, d: 4, z: 88, h: 8, c: 'ink', delay: d + .25});
    B(sc, {x: x0 + 17, y: y0 + 11, w: 8, d: 8, z: 96, h: 8, c: 'yellow', delay: d + .28});
    return {front: fr, head: sc.P(x0 + 21, y0 + 15, 108), face: () => {
      const yp = y0 + 26;
      poly(sc, yp, [[x0 + 11, 66], [x0 + 31, 66], [x0 + 31, 85], [x0 + 11, 85]], '#fff', {stroke: '#1D1E24', 'stroke-width': 1, style: 'animation:fi .4s ease ' + (d + .6) + 's both'});
      mark(sc, x0 + 14.5, yp, 82, 13, d + .7);
      if (o.mask !== false){
        const g = EW.el('g', {style: `transform-box:fill-box;transform-origin:center;animation:maskoff .55s cubic-bezier(.5,0,1,.55) ${o.maskAt || 1.3}s both`}, sc.top);
        const P = (x, z) => sc.P(x, yp + .2, z).map(n => n.toFixed(1)).join(',');
        const add = (pts, fill, extra) => EW.el('polygon', Object.assign({points: pts.map(([x, z]) => P(x, z)).join(' '), fill}, extra || {}), g);
        add([[x0 + 9, 63], [x0 + 33, 63], [x0 + 33, 87], [x0 + 9, 87]], '#FEC514', {stroke: '#1D1E24', 'stroke-width': 1.2});
        add([[x0 + 13, 76], [x0 + 19, 76], [x0 + 19, 81], [x0 + 13, 81]], '#1D1E24');
        add([[x0 + 23, 76], [x0 + 29, 76], [x0 + 29, 81], [x0 + 23, 81]], '#1D1E24');
        add([[x0 + 15, 69], [x0 + 27, 69], [x0 + 27, 71], [x0 + 15, 71]], '#1D1E24');
      }
    }};
  }

  // speech bubble (HTML) with a tail; side 'l' puts the tail on the left, 'r' on the right
  function bubble(text, o){
    const d = document.createElement('div');
    d.className = 'sb' + (o.cls ? ' ' + o.cls : '');
    d.style.cssText = `left:${o.x}px;top:${o.y}px;${o.w ? 'width:' + o.w + 'px;' : ''}animation-delay:${o.delay}s`;
    d.innerHTML = text; document.body.appendChild(d); return d;
  }
  return {iso, sre, ai, ovh, bubble, mark, poly, B};
})();
