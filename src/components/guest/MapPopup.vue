<template>
  <div>
    <p>
      Lokasi Kos
    </p>
    {{ text }}
  </div>
</template>

<script>

export default {
  name: 'GeoJson2Popup',
  props: ['type', 'text']
}
</script>
