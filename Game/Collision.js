// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

function rectintersect(ax, ay, aw, ah, bx, by, bw, bh) {
    return (ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by);
}

function Distance(ax, ay, bx, by) {
    let difX = ax - bx;
    let difY = ay - by;
    return Math.sqrt(difX * difX + difY * difY);
}