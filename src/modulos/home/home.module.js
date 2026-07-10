export function registerHomeModule(router, appState) {
  router.register('home', () => {
    appState.currentModule = 'home';
    const target = document.getElementById('app');
    if (!target) return;

    target.innerHTML = `
      <section class="hero-card">
        <h2>Fluxo rápido</h2>
        <p>Escolha o tipo de documento e entre direto no cenário clínico.</p>
        <div class="home-grid">
          <a class="action-card" href="estação.html?mode=entrada">
            <strong>Nova evolução</strong>
            <span>Entrada padrão do PS</span>
          </a>
          <a class="action-card" href="estação.html?mode=reavaliacao">
            <strong>Reavaliação</strong>
            <span>EM TEMPO / revisão clínica</span>
          </a>
          <a class="action-card" href="estação.html?mode=internacao">
            <strong>Internação</strong>
            <span>Justificativa robusta</span>
          </a>
          <a class="action-card" href="estação.html?mode=parecer">
            <strong>Parecer</strong>
            <span>Especialidade / discussão</span>
          </a>
          <a class="action-card" href="estação.html?mode=exame">
            <strong>Exame alto custo</strong>
            <span>TC, RM, eco, angioTC</span>
          </a>
          <a class="action-card" href="estação.html?mode=passagem">
            <strong>Passagem de plantão</strong>
            <span>Resumo objetivo e seguro</span>
          </a>
        </div>
      </section>

      <section class="panel-row">
        <div class="panel">
          <div class="panel-title">Queixas mais comuns</div>
          <div class="chip-grid">
            <a class="chip" href="estação.html?mode=entrada&qp=DOR%20TOR%C3%81CICA">Dor torácica</a>
            <a class="chip" href="estação.html?mode=entrada&qp=DISPNEIA">Dispneia</a>
            <a class="chip" href="estação.html?mode=entrada&qp=DOR%20ABDOMINAL">Dor abdominal</a>
            <a class="chip" href="estação.html?mode=entrada&qp=CEFALEIA">Cefaleia</a>
            <a class="chip" href="estação.html?mode=entrada&qp=FEBRE%20%2F%20SEPSE">Febre / sepse</a>
            <a class="chip" href="estação.html?mode=entrada&qp=S%C3%8DNCOPE">Síncope</a>
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">Atalhos úteis</div>
          <div class="shortcut-list">
            <button class="btn" id="resumeDraft">Abrir último rascunho</button>
            <button class="btn" id="newBlank">Modelo vazio</button>
          </div>
        </div>
      </section>
    `;

    document.getElementById('resumeDraft')?.addEventListener('click', () => {
      window.location.href = 'estação.html?resume=1';
    });

    document.getElementById('newBlank')?.addEventListener('click', () => {
      appState.storage.removeItem('hms_station_v1');
      window.location.href = 'estação.html?mode=entrada';
    });
  });
}
