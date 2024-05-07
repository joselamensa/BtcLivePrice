async function webScraping() {
  try {
    const response = await fetch(
      "https://www.binance.com/es-AR/markets/overview"
    );
    if (!response.ok) {
      throw new Error(
        "Error en la solicitud. Código de estado: " + response.status
      );
    }
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const targetElement = doc.querySelector("div.css-1ydqfmf");

    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";
    resultadosDiv.appendChild(targetElement.cloneNode(true));
  } catch (error) {
    console.error("Ocurrió un error:", error);
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML =
      "Error al cargar los resultados. Por favor, inténtalo nuevamente más tarde.";
  }
}

setInterval(webScraping, 5000);
