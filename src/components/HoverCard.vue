<script setup lang="ts">
const card = ref<HTMLElement>()
const { x, y } = useRelativePosition(card)
const size = ref(100)
const style = computed(() => {
  return {
    'mask-image': `radial-gradient(${size.value}px at ${x.value}px ${y.value}px, white, transparent)`
  }
})
</script>

<template>
  <div flex="~ items-center" gap-4 mb-2>
    <span>
      Circle size:
    </span>
    <input type="range" min="50" max="250" v-model="size" />
    <span>{{ size }}</span>
  </div>
  <div ref="card"
    class="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
    </svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
    </svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
    </svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
    </svg>
    <div class="p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative">
      <div
        class="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full">
        <div class="pointer-events-none">
          <div
            class="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50">
          </div>
          <div
            class="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
            :style="style" />
          <div class="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
            :style="style">
            <p
              class="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
              CXosppNc7Ihl50jtNGaVPDzkbIa75n7w8Ab0aoOa4nb8sOfDfx1pIJuR02t1CfRatT2Tebf90VOUWAyuvAyDvdwM1ftAs7WPlTEoO0yruhx5Zi3lfCzZbePo5pgk9xmnCQQhtQlRm7ZmmnLyVDSh5Bl2o22D8yYXj8q1aCqiHFtw9KApFwDkBvbXLc2jHEXmYOOdUuFpiN9kbuXqfa21K0549lQr35wLASHIieq7wg7nRGFbRS4To1wfF93QZERTxXjbWaGplLXD49PQdnn65w0XnU77cMJeZ09KgjPQQWM3hRnCxv8be8LJQJu86FM1F0VaTliTgs9WKgYPAldqWaadoOd6FBzcjxAEUWWZObQvAj5As6GXr8iWB5hV7kfSeWhSxsgFfL1mDZArrPqsJpjG2znfNWoTQcXyM4yLldHo1o5iW8xoNM6Tq0rIEJQLBwWfarT2HrIkPsq8PBOoVNFRPUtfc9BJt3PeMsyGXkhIvi3hcEgQYOi5FvpOx7zOCxMrXpfdob6MQwGoLEcZMZYfbLZMFNMDcsvTFDlewVmIRWbsARh94o60qweqs46OBsv2O8mjEVGcbbr1GBPnDLCIMmuEQPoRQwLdFNPAskruScXcQmlmbTxjuJcOykrvXaATXsRgbAlhurICoaYt7xBwWkKz0SKuvhWvI3HbuiXq0rX5PUQRd9CjkXpN4UZGBqsMUUz7lebrUq2V4XOrhvgV76JZYt4NbcYJMpHoXB0xCm4I8u0UTVEBuoTMqEG4vcfEjoxZToF5QJ9hpUO5eUAc7XjPajwGpKm56sg2Cslzsh3Zh38ZqUlZdHzS3I5HLDZyB6izKbESDFDUXnTMn8goxu0NUFOCTTAasngGBTDEBqtDvNlmNkzXBerHDk36gam1wH6ETXnpe6tghr3TTl4AhEmgyLz2YCCEDPr8dz6DTTqCiMZSY5LD7uO3TbLjrEdI63haW1Pvhm3oTJ6v5Oi4d4OjdJMlfGM1R9SAU9gT3fqrBqcs3wnlvr05Ibjx2b9jjIIRXkGAHsS7wxByQ5dhbEKD2mPDfgQl0QbKRmPaaQcounYEyy9e0VY9ozTytn9eipQaNrXAwe0sxEodIsCquX6Zoe3sQjHkafHiaDPiPAPyVnSfXB6kZ2HODsO2or85mMydczfqWWVgw8IZBwexSIFRl2QgUWvCUc3XdCyGJiEJHeeIQdtpUQGtUjRH4w0KaP7wMyUa8ZbUGC0y3v8XESnKfelQi3Z0wdGT293T8Rhl4kOaymJFth6Mvc3ySn8VAx0s7YGm6V6J4rHBSzkRU39Jkzmx0p6XhdobLXnSbx1N2wlpT778aDKLvhh6SE6P34JoL0f77Myqe5TMyU6JKxGW2FHIuRgKuMiu4uaLSbrpb47dSyZr8sCRlu3bEGcoHxeCG4OCZ2ElPtaCFgZxReO3XgTfBS95HHd1nLUNYDUK2ukKfA3bkBa9d4kjJwAieYCWpn85MG2kPSrTwkzuEY5j
            </p>
          </div>
        </div>
        <div class="relative z-10 flex items-center justify-center">
          <div class="relative h-44 w-44  rounded-full flex items-center justify-center text-white font-bold text-4xl">
            <div class="absolute w-full h-full bg-white/[0.8] dark:bg-black/[0.8] blur-sm rounded-full"></div><span
              class="dark:text-white text-black z-20">hover</span>
          </div>
        </div>
      </div>
    </div>
    <h2 class="dark:text-white text-black mt-4 text-1 font-light">Hover over this card to reveal an awesome effect.
      Running out of copy here.</h2>
  </div>
</template>
