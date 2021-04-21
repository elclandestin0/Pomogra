<a-scene vr-mode-ui>
  <a-sphere position="0 0 -5" radius="1" color="red">
    <a-animation
      begin="mouseenter"
      end="mouseleave"
      fill="forwards"
      repeat="0"
      direction="normal"
      attribute="scale"
      from="1 1 1"
      to="3 3 3"
      dur="2000"
    ></a-animation>
    <a-animation
      id="animShrink"
      begin="mouseleave"
      end="mouseenter"
      repeat="0"
      fill="forwards"
      direction="normal"
      attribute="scale"
      to="1 1 1"
      dur="2000"
    ></a-animation>
  </a-sphere>

  <a-camera id="camera">
    <a-cursor color="#4CC3D9"></a-cursor>
  </a-camera>
</a-scene>;
