export function registerInternacaoModule(router, appState) {
  router.register('internacao', () => {
    appState.currentModule = 'internacao';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>Internação</h2><p>Módulo de internação com fluxo próprio.</p></section>';
  });
}
