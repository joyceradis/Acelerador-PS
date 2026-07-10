export function registerAltaModule(router, appState) {
  router.register('alta', () => {
    appState.currentModule = 'alta';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>Alta</h2><p>Módulo de alta com checklist e templates.</p></section>';
  });
}
