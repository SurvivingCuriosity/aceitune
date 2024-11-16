import { useEffect } from "react";
import { LinesChart } from "./components/charts/LinesChart";
import { RadarChartComponent } from "./components/charts/RadarChart";
import { Coincidencias } from "./components/Coincidencias/Coincidencias";
import { GestorVentanas } from "./components/GestorVentanas";
import { ItemsSelected } from "./components/ItemsSelected/ItemsSelected";
import { AppTitle } from "./components/ui/AppTitle";
import { WidgetContainer } from "./components/ui/WidgetContainer";
import { useAuthStore } from "./store/AuthStore";
import { useItemsStore } from "./store/ItemsStore";
import { BarrasChart } from "./components/charts/BarrasChart";

function App() {

  const { token, fetchToken } = useAuthStore();

  const { canciones, artistas } = useItemsStore()

  useEffect(() => {
    const initialize = async () => {
      if (token === null) {
        await fetchToken();
      }
    };
    initialize();
  }, [token, fetchToken]);

  return (
    <>
      <GestorVentanas />
      <div className="min-h-dvh w-screen bg-neutral-950 p-4 text-neutral-50">
        <main className="mx-auto flex max-w-screen-xl flex-col gap-2">
          <AppTitle />
          <ItemsSelected />
          {[...canciones, ...artistas].length === 0
            ? <p className="mt-20 animate-pulse text-center text-neutral-400">Add an artist or song to get started...</p>
            :
            <>
              <div className="parent">
                <div className="div1">
                  <WidgetContainer title="Exact matches">
                    <Coincidencias />
                  </WidgetContainer>
                </div>
                <div className="div2">
                  <WidgetContainer title="Scales distribution">
                  <RadarChartComponent />
                </WidgetContainer>
                </div>
                <div className="div3">
                <WidgetContainer title="BPM distribution">
                  <BarrasChart />
                </WidgetContainer>
                </div>
                <div className="div4">
                <WidgetContainer title="Popularity">
                  <LinesChart />
                </WidgetContainer>
                </div>
                <div className="div5">
                <WidgetContainer title="Exact matches">
                    <Coincidencias />
                  </WidgetContainer>
                </div>
              </div>
            </>

          }
        </main>
      </div>
    </>
  )
}

export default App
