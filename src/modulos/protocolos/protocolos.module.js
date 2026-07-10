export function registerProtocolosModule(router, appState) {
  router.register('protocolos', () => {
    appState.currentModule = 'protocolos';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>Protocolos</h2><p>Central de protocolos clínicos e fluxos de atendimento.</p></section>';
  });
}
