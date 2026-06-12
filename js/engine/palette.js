/* EGA palette & pixel paint helpers — all game art goes through P */
(function () {
  const EGA = ['#000000', '#0000AA', '#00AA00', '#00AAAA', '#AA0000', '#AA00AA', '#AA5500', '#AAAAAA',
               '#555555', '#5555FF', '#55FF55', '#55FFFF', '#FF5555', '#FF55FF', '#FFFF55', '#FFFFFF'];
  function col(c) { return typeof c === 'number' ? EGA[c & 15] : c; }

  const P = {
    EGA,
    col,
    rect(ctx, x, y, w, h, c) {
      ctx.fillStyle = col(c);
      ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    },
    px(ctx, x, y, c) { P.rect(ctx, x, y, 1, 1, c); },
    line(ctx, x1, y1, x2, y2, c, t) {
      t = t || 1;
      let x = Math.round(x1), y = Math.round(y1);
      const ex = Math.round(x2), ey = Math.round(y2);
      const dx = Math.abs(ex - x), dy = -Math.abs(ey - y);
      const sx = x < ex ? 1 : -1, sy = y < ey ? 1 : -1;
      let err = dx + dy;
      for (let i = 0; i < 4000; i++) {
        P.rect(ctx, x, y, t, t, c);
        if (x === ex && y === ey) break;
        const e2 = 2 * err;
        if (e2 >= dy) { err += dy; x += sx; }
        if (e2 <= dx) { err += dx; y += sy; }
      }
    },
    poly(ctx, pts, c) {
      if (!pts || pts.length < 3) return;
      ctx.fillStyle = col(c);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fill();
    },
    circle(ctx, cx, cy, rx, ry, c) {
      ctx.fillStyle = col(c);
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.abs(rx), Math.abs(ry === undefined ? rx : ry), 0, 0, Math.PI * 2);
      ctx.fill();
    },
    dither(ctx, x, y, w, h, c1, c2) {
      x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
      P.rect(ctx, x, y, w, h, c1);
      ctx.fillStyle = col(c2);
      for (let yy = 0; yy < h; yy++)
        for (let xx = (yy % 2); xx < w; xx += 2)
          ctx.fillRect(x + xx, y + yy, 1, 1);
    },
    bands(ctx, x, y, w, h, colors) {
      const n = colors.length;
      const bh = h / n;
      for (let i = 0; i < n; i++) P.rect(ctx, x, y + i * bh, w, Math.ceil(bh), colors[i]);
    },
  };

  window.EGA = EGA;
  window.P = P;
})();
