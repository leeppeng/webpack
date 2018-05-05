<template lang="html">
    <div>
        <h1>Hello webpack <span :class="$style.title">SpanTitle</span></h1>
    </div>
</template>
<script>
export default {

}
</script>

<style lang="scss" module>
@import "../assets/css/style.scss";
h1 {
  font-size:20px;
  color:red;
}
</style>

