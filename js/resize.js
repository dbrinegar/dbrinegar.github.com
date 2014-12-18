/*
  page code to switch between three layouts: large, medium, small, based only
  on available space in the viewport

  large has two zones:
    <div id=site> for main content, 33em wide
    <div id=sidebar> for a narrow 16em column on the right, with 2em margin

  medium has enough room for site but not sidebar, so sidebar goes away

  small doesn't have enough room for any of that, so sidebar is gone and the
  site area falls back to 100% of available space

  works best with a worker div to measure width of em:
  <div id="em" style="width:1em;visibility=hidden"></div>
*/

(function() {

  function getEl(id) {
    return document.getElementById(id);
  }

  var currentLayout,
      L = 'large',
      M = 'medium',
      S = 'small',
      body = document.body,
      site = getEl('site'),
      sidebar = getEl('sidebar'),
      em = getEl('em');

  // only change layout if needed
  function resize() {
    var w = window.innerWidth ||
            document.documentElement.clientWidth || document.body.clientWidth,
        empx = em.clientWidth || 16;
    w = w / empx;
    if (w >= 52 && currentLayout != L) {
      body.style['margin-right'] = '18em';
      site.style['width'] = '33em';
      sidebar.style['display'] = 'block';
      currentLayout = L;
    }
    if (w >= 33 && w < 52 && currentLayout != M) {
      body.style['margin-right'] = '1em';
      site.style['width'] = '33em';
      sidebar.style['display'] = 'none';
      currentLayout = M;
    }
    if (w < 33 && currentLayout != S) {
      body.style['margin-right'] = '1em';
      site.style['width'] = '100%';
      sidebar.style['display'] = 'none';
      currentLayout = S;
    }
  }

  resize();

  // delay work until last resize event is 16ms old
  // effectively eating rapid fire events
  var timer;
  function adjust() {
    clearTimeout(timer);
    timer = setTimeout(resize, 16);
  }
  if (window.addEventListener) {
    window.addEventListener('resize', adjust, false);
  } else if (window.attachEvent) {
    window.attachEvent('onresize', adjust);
  }
})();
