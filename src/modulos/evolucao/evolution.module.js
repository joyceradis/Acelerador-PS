export function registerEvolutionModule(router, appState) {
  router.register('evolution', () => {
    appState.currentModule = 'evolution';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>Evolução</h2><p>Módulo preparado para crescer com regras clínicas e templates.</p></section>';
  });
}
