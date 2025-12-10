import { useControls, button } from "leva"
import { mockConfig } from "@/mocks/config"

const defaults = {
  latency: 300,
  errorRate: 0,
}

export function DevTools() {
  const [, set] = useControls(
    "MSW Settings",
    () => ({
      latency: {
        value: defaults.latency,
        min: 0,
        max: 5000,
        step: 100,
        label: "Latency (ms)",
        onChange: (v: number) => {
          mockConfig.latency = v
        },
      },
      errorRate: {
        value: defaults.errorRate,
        min: 0,
        max: 100,
        step: 5,
        label: "Error Rate (%)",
        onChange: (v: number) => {
          mockConfig.errorRate = v
        },
      },
      reset: button(() => {
        set(defaults)
        mockConfig.latency = defaults.latency
        mockConfig.errorRate = defaults.errorRate
      }),
    }),
    { collapsed: false }
  )

  return null
}
