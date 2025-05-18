export const nasaConfig = {
  autoPlay: true,
  background: {
    color: {
      value: "#232741"
    },
    image: "url('http://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1237px-NASA_logo.svg.png')",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "20%",
    opacity: 1
  },
  backgroundMask: {
    composite: "destination-out",
    cover: {
      opacity: 1,
      color: {
        value: ""
      }
    },
    enable: false
  },
  clear: true,
  defaultThemes: {},
  delay: 0,
  fullScreen: {
    enable: true,
    zIndex: 0
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "repulse"
      },
      onHover: {
        enable: true,
        mode: "bubble",
        parallax: {
          enable: false,
          force: 2,
          smooth: 10
        }
      },
      resize: {
        delay: 0.5,
        enable: true
      }
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        mix: false,
        opacity: 0,
        size: 0
      },
      repulse: {
        distance: 400,
        duration: 0.4,
        factor: 100,
        speed: 1,
        maxSpeed: 50,
        easing: "ease-out-quad"
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    move: {
      angle: {
        offset: 0,
        value: 90
      },
      enable: true,
      speed: {
        min: 0.1,
        max: 1
      }
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080
      },
      value: 160
    },
    opacity: {
      value: {
        min: 0.1,
        max: 1
      },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
        mode: "auto",
        startValue: "random"
      }
    },
    shape: {
      type: "circle"
    },
    size: {
      value: {
        min: 1,
        max: 3
      }
    }
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  zLayers: 100
}; 