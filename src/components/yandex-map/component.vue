<template>
  <yandex-map
    zoom="16"
    style="width: 100%; max-width: 100%; height: inherit;"
    :controls="[]"
    :coords="coords"
    :options="{
      suppressMapOpenBlock: true
    }"
  >
    <ymap-marker
      v-for="(billboard, index) in surfaces"
      :key="index"
      marker-type="placemark"
      :balloon-template="mapBalloon(billboard, index)"
      :coords="billboard.coords.split(',')"
      :marker-id="index"
      :icon="markerIcon"
    />
  </yandex-map>
</template>

<script>
/* eslint-disable */
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
  components: { yandexMap, ymapMarker },
  props: {
    address: {
      type: String,
      default() {
        return 'Unknown';
      },
    },
    lat: {
      type: String,
      default() {
        return 'Unknown';
      },
    },
    long: {
      type: String,
      default() {
        return 'Unknown';
      },
    },
  },
  data() {
    return {
      coords: [this.lat, this.long],
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: require('@/img/icons/map_bullit-g.svg'),
        imageSize: [38, 32.5],
        imageOffset: [-30, -30]
      },
      layout:
        "<div>{{ properties.balloonContentHeader }}</div><div>{{ properties.balloonContentBody }}</div>",
      surfaces: [
        {
          id: "1",
          address: this.address,
          coords: `${this.lat}, ${this.long}`
        }
      ]
    };
  },
  methods: {
    mapBalloon: function(billboard, index) {
      return `
      <div>
        <h4>${billboard.address}</h4>
      </div>
      `;
    }
  }
};
</script>
