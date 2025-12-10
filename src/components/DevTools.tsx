import { useControls, buttonGroup, Leva } from "leva"
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
        max: 10000,
        step: 100,
        label: "Latency (ms)",
        onChange: (v: number) => {
          mockConfig.latency = v
        },
      },
      " ": buttonGroup({
        "0": () => {
          set({ latency: 0 })
          mockConfig.latency = 0
        },
        "300": () => {
          set({ latency: 300 })
          mockConfig.latency = 300
        },
        "700": () => {
          set({ latency: 700 })
          mockConfig.latency = 700
        },
        "3s": () => {
          set({ latency: 3000 })
          mockConfig.latency = 3000
        },
        "10s": () => {
          set({ latency: 10000 })
          mockConfig.latency = 10000
        },
      }),
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
      "  ": buttonGroup({
        "0%": () => {
          set({ errorRate: 0 })
          mockConfig.errorRate = 0
        },
        "25%": () => {
          set({ errorRate: 25 })
          mockConfig.errorRate = 25
        },
        "50%": () => {
          set({ errorRate: 50 })
          mockConfig.errorRate = 50
        },
        "100%": () => {
          set({ errorRate: 100 })
          mockConfig.errorRate = 100
        },
      }),
    }),
    { collapsed: false }
  )

  return <Leva oneLineLabels />
}
