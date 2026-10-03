document.addEventListener("DOMContentLoaded", () => {
    const mapElement = document.querySelector("#map");
    const status = document.querySelector("#map-status");

    if (!mapElement || typeof L === "undefined") {
        if (status) {
            status.textContent = "No se ha podido cargar el mapa.";
        }
        return;
    }

    // Ubicación de Florea
    const business = [39.4627, -0.3666];

    const map = L.map("map").setView(business, 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Marcador con la flor de Florea
    const flowerIcon = L.divIcon({
        className: "florea-map-marker",
        html: "🌸",
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });

    L.marker(business, {
        icon: flowerIcon
    })
        .addTo(map)
        .bindPopup(`
            <strong>🌸 Florea</strong><br>
            Av. del Regne de València, 63<br>
            46005 València
        `)
        .openPopup();

    if (status) {
        status.textContent =
            "Encuéntranos en Av. del Regne de València, 63, València.";
    }
});