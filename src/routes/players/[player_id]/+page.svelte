<script>
    const { data } = $props();
</script>

<div class="container my-5">
    <!-- Name + Rückennummer oben -->
    <div
        class="d-flex justify-content-center align-items-center gap-4 mb-5 flex-wrap text-center text-md-start"
    >
        <h1 class="text-danger display-4 fw-bold mb-0">{data.player.name}</h1>
        <div class="fs-1 fw-bold text-secondary">#{data.player.number}</div>
    </div>

    <!-- Bild links / Details rechts -->
    <div class="row justify-content-center align-items-center mb-5">
        <!-- Spielerbild -->
        <div class="col-md-5 text-center mb-4 mb-md-0">
            <img
                src={`/images/players/${data.imageFilename}`}
                alt={data.player.name}
                class="img-fluid"
                style="max-width: 100%; height: auto; max-height: 500px;"
            />
        </div>

        <!-- Spieler-Details -->
        <div class="col-md-5 d-flex flex-column justify-content-center">
            <p class="fs-5 mb-2">
                <strong class="d-block">Position:</strong>
                {data.player.position}
            </p>
            <p class="fs-5 mb-2">
                <strong class="d-block">Nationalität:</strong>
                <span class="text-nowrap"
                    >{data.player.nationality.join(" / ")}</span
                >
            </p>
            <p class="fs-5 mb-2">
                <strong class="d-block">Geburtsdatum:</strong>
                {new Date(data.player.birthdate).toLocaleDateString()}
            </p>
            <p class="fs-5 mb-2">
                <strong class="d-block">Marktwert:</strong>
                {data.player.value?.toLocaleString() || ""} CHF
            </p>
        </div>
    </div>

    <!-- Zurück-Button -->
    <div class="text-center">
        <a href="/players?t=t1" class="btn btn-lg btn-outline-secondary px-4">
            ← Zurück zur Übersicht
        </a>
    </div>
</div>
