<template>
  <div>
    <div class="disciplines-container mt-6" style="height: 800px !important">
      <nav>
        <div class="up">&cularr; BACK</div>
      </nav>
      <div id="chart" class="feature"></div>
    </div>
  </div>
</template>
<script>
import {
  scaleLinear,
  scaleOrdinal,
  schemeDark2,
  treemap,
  hierarchy,
  treemapResquarify,
  select,
  rgb,
  transition,
  easeCubicOut,
} from 'd3'
import fields from '~/assets/data/disciplinesWikipedia'
export default {
  props: {},
  data() {
    return {
      width: 100,
      height: 100,
    }
  },
  computed: {},
  mounted() {
    const x = scaleLinear().domain([0, this.width]).range([0, this.width])
    const y = scaleLinear().domain([0, this.height]).range([0, this.height])
    const color = scaleOrdinal().range(
      schemeDark2.map(function (c) {
        c = rgb(c)
        // c.opacity = 0.5;
        return c
      })
    )
    const disciplinesTreemap = treemap()
      .size([this.width, this.height])
      .tile(treemapResquarify) // doesn't work - height & width is 100%
      .paddingInner(0)
      .round(false) // true

    const nodes = hierarchy(fields).sum(function (d) {
      return d.value ? 1 : 0
    })
    // .sort(function(a, b) { return b.height - a.height || b.value - a.value });

    let currentDepth
    console.log('nodes: ', nodes)

    disciplinesTreemap(nodes)
    const tooltip = select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('background', '#000')
      .style('padding', '1rem')
      .style('color', '#FFF')
      .text('a simple tooltip')
      .on('mouseover', function (event, d) {
        tooltip.html(
          ' <b>' +
            d.data.value +
            '</b>' +
            (d.data?.description ? '<br> ' + d.data?.description : '')
        )
        return tooltip.style('visibility', 'visible')
      })
      .on('mouseout', function () {
        return tooltip.style('visibility', 'hidden')
      })
    const chart = select('#chart')
    const cells = chart
      .selectAll('.node')
      .data(nodes.descendants())
      .enter()
      .append('div')
      .attr('class', function (d) {
        return 'node level-' + d.depth
      })
      .attr('title', function (d) {
        return d.data.value ? d.data.value : 'null'
      })

    cells
      .style('left', function (d) {
        return x(d.x0) + '%'
      })
      .style('top', function (d) {
        return y(d.y0) + '%'
      })
      .style('width', function (d) {
        return x(d.x1) - x(d.x0) + '%'
      })
      .style('height', function (d) {
        return y(d.y1) - y(d.y0) + '%'
      })
      // .style("background-image", function(d) { return d.value ? imgUrl + d.value : ""; })
      // .style("background-image", function(d) { return d.value ? "url(http://placekitten.com/g/300/300)" : "none"; })
      .style('background-color', function (d) {
        while (d.depth > 7) d = d.parent
        return color(d.data.value)
      })
      .on('click', function (event, d) {
        return zoom(d)
      })
      .append('p')
      .attr('class', 'label')
      .text(function (d) {
        return d.data.value ? d.data.value : '---'
      })
      .on('mouseover', function (event, d) {
        tooltip.html(
          d.data.value +
            (d.data?.description ? '<br> ' + d.data?.description : '')
        )
        return tooltip.style('visibility', 'visible')
      })
      .on('mousemove', function (event) {
        return tooltip
          .style('top', event.pageY + 'px')
          .style('left', event.pageX + 'px')
      })
      .on('mouseout', function () {
        return tooltip.style('visibility', 'hidden')
      })
    // .style("font-size", "")
    // .style("opacity", function(d) { return isOverflowed( d.parent ) ? 1 : 0; });

    const parent = select('.up')
      .datum(nodes)
      .on('click', function (event, d) {
        return zoom(d)
      })

    function zoom(d) {
      // http://jsfiddle.net/ramnathv/amszcymq/

      console.log('clicked: ' + d.data.name + ', depth: ' + d.depth)

      currentDepth = d.depth
      parent.datum(d.parent || nodes)

      x.domain([d.x0, d.x1])
      y.domain([d.y0, d.y1])

      const t = transition().duration(800).ease(easeCubicOut)

      cells
        .transition(t)
        .style('left', function (d) {
          return x(d.x0) + '%'
        })
        .style('top', function (d) {
          return y(d.y0) + '%'
        })
        .style('width', function (d) {
          return x(d.x1) - x(d.x0) + '%'
        })
        .style('height', function (d) {
          return y(d.y1) - y(d.y0) + '%'
        })

      cells // hide this depth and above
        .filter(function (d) {
          return d.ancestors()
        })
        .classed('hide', function (d) {
          return !!d.children
        })

      cells // show this depth + 1 and below
        .filter(function (d) {
          return d.depth > currentDepth
        })
        .classed('hide', false)
    }
  },
  methods: {},
}
</script>
<style lang="scss">
$m: 0; // margin

.disciplines-container,
.disciplines-container *:before,
.disciplines-container *:after {
  box-sizing: border-box;
}

.disciplines-container {
  position: relative;
  height: 800px;
  display: block;
}
.disciplines-container nav {
  position: absolute;
  width: 100%;
  top: 0;
  padding: 16px;
  z-index: 100;
  .up {
    font: bold 14px/1 sans-serif;
    color: black;
    width: 92px;
    padding: 8px;
    background-color: white;
    cursor: pointer;
    border: 4px solid black;
    opacity: 0.6;
    &:hover {
      background-color: light-grey;
      box-shadow: 0 0 0 2em rgba(#fff, 0);
      opacity: 1;
    }
  }
}
.feature {
  position: relative;
  width: calc(100% - #{$m} * 2 * 1px);
  height: calc(100% - #{$m} * 2 * 1px);
  margin: $m * 1px;
  //background: #aaa;
  overflow: hidden;
}
.disciplines-container .node {
  position: absolute;
  background: transparent no-repeat 70% / cover;
  //border: 1px white solid;
  overflow: hidden;
  opacity: 0.8;
  transition: opacity 0.8s;
  cursor: pointer;
  .label {
    display: inline;
    font-family: 'Bodona modi';
    color: hsla(0deg, 0%, 100%, 80%);
    //white-space: nowrap;
    position: absolute;
    padding: 0;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: color 0.4s, opacity 0.9s, filter 0.8s;
  }
  &.hide {
    // zoom in
    opacity: 0;
    pointer-events: none;
    .label {
      filter: blur(10px);
    }
  }
  &:hover {
    //background-color: #222 !important;
    .label {
      opacity: 1;
      color: rgba(100%, 100%, 100%, 100%);
    }
  }
  &.level-0 {
    z-index: 7;
    font-size: 0.05vw;
    display: none;
  }
  &.level-1 {
    z-index: 6;
    font-size: 3vw;
  }
  &.level-2 {
    z-index: 5;
    font-size: 2vw;
  }
  &.level-3 {
    z-index: 4;
    font-size: 1.8vw;
  }
  &.level-4 {
    z-index: 3;
    font-size: 1.8vw;
  }
  &.level-5 {
    z-index: 2;
    font-size: 1.8vw;
  }
  &.level-6 {
    z-index: 1;
    font-size: 1.8vw;
  }
}
</style>
