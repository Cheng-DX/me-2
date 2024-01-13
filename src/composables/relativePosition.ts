export function useRelativePosition<E extends HTMLElement>(el: Ref<E | undefined>) {
  const { x: mouseX, y: mouseY } = useMouse()
  const rect = useElementBounding(el)

  return {
    x: computed(() => mouseX.value - rect.left.value),
    y: computed(() => mouseY.value - rect.top.value),
  }

}